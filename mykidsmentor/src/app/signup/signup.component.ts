import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from './../service/authentication.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EverificationComponent } from './../everification/everification.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface MessagesIndex {
  [index: string]: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  error: any;
  isSmallScreen: Observable<boolean>;
  userName;
  isLoading: boolean;
  actionCodeSettings = {
    // After password reset, the user will be give the ability to go back
    // to this page.
    url: 'http://localhost:4200/',
    handleCodeInApp: false
  };
  params = {
    'invalid-email': '請輸入一個正確的電子郵件！',
    'email-already-in-use': '您輸入的電子郵件已經在使用了，請您再輸入新的'
  } as MessagesIndex;

  constructor(public signupDialogRef: MatDialogRef<SignupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public auth: AngularFireAuth,
              private signup: AuthenticationService,
              private router: Router,
              public dialog: MatDialog,
              breakpointObserver: BreakpointObserver) {
                this.isSmallScreen = breakpointObserver.observe('(max-width: 1324px)').pipe(map(result => !result.matches));
                console.log(this.isSmallScreen);
              }

  ngOnInit(): void {
  }


  onSubmit(formData) {
    this.isLoading = true;
    let form = document.getElementById('signupFrom');
    this.signup.createUser(formData).then(
      async (success) => {
      this.isLoading = false;
      this.sendUserVerificationMail(this.actionCodeSettings);
      this.signupDialogRef.close(false);
      this.dialog.open(EverificationComponent, {
        panelClass : 'verifyClass',
        data: {userEmail: formData.value.email}
      }).afterClosed().subscribe(
        result => {}
      );
      this.userName = formData.value.firstname;
      console.log(this.userName)
      console.log(formData.value)
      console.log(success);

      (await this.signup.updateProf().currentUser).updateProfile({
        displayName: this.userName
    }).then( (success) => {

    }, function(error) {
      // An error happened.
    });
      this.router.navigate(['']);
      this.isLoading = false;
    }).catch(
      (error) => {
      console.log(error);
      let code = error.code.split('/')[1];
      if (this.params[code]) {
        this.error = this.params[code];
      }
      this.isLoading = false;
      if(form) {
        (form as HTMLFormElement).reset();
      }
    });
  }

  sendUserVerificationMail(actionCodeSettings) {
    this.signup.sendVerificationMail(actionCodeSettings).then(
      (success) => {
      console.log(success);
      // this.signupDialogRef.close([]);
      this.router.navigate(['']);
    }).catch((err) => {
      this.error = err;
    });
  }

  onUserLoginWithGoogle() {
    this.isLoading = true;
    this.signup.onLoginWithGoogle().then(
      (success) => {
      this.isLoading = false;
      this.signupDialogRef.close(false);
      this.router.navigate(['']);
    }).catch((err) => {
      this.isLoading = false;
      this.error = err;
    });
  }

  onUserLoginWithFb() {
    this.isLoading = true;
    this.signup.onLoginWithFb().then(
      (success) => {
      console.log(success);
      this.isLoading = false;
      this.signupDialogRef.close([]);
      this.router.navigate(['']);
    }).catch((err) => {
      this.isLoading = false;
      this.error = err;
    });
  }


  close(showLoginModal: boolean): void {
    this.signupDialogRef.close(showLoginModal);
   }


}
