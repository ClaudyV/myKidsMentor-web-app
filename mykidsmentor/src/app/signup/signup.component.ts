import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from './../service/authentication.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EverificationComponent } from './../everification/everification.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  error: any;
  @Output() messageEvent = new EventEmitter<string>();
  isSmallScreen: boolean;
  userName;
  dataLoading: boolean;
  actionCodeSettings = {
    // After password reset, the user will be give the ability to go back
    // to this page.
    url: 'http://localhost:4200/',
    handleCodeInApp: false
  };

  constructor(public signupDialogRef: MatDialogRef<SignupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public auth: AngularFireAuth,
              private signup: AuthenticationService,
              private router: Router,
              public dialog: MatDialog,
              breakpointObserver: BreakpointObserver) {
                this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
                console.log(this.isSmallScreen);
              }

  ngOnInit(): void {
  }


  onSubmit(formData) {
    this.dataLoading = true;
    this.signup.createUser(formData).then(
      async (success) => {
      this.sendUserVerificationMail(this.actionCodeSettings);
      this.dialog.open(EverificationComponent, {
        height: '70px',
        width: '570px',
      }).afterClosed().subscribe(
        result => {}
      );
      this.userName = formData.value.firstname;
      console.log(this.userName)
      console.log(formData.value)
      console.log(success);
      this.signupDialogRef.close({
        bool: false,
        data : this.userName
     });
      (await this.signup.updateProf().currentUser).updateProfile({
        displayName: this.userName
    }).then( (success) => {

    }, function(error) {
      // An error happened.
    });
      this.router.navigate(['']);
      this.dataLoading = false;
    }).catch(
      (err) => {
      console.log(err);
      this.error = err;
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
    this.signup.onLoginWithGoogle().then(
      (success) => {
      console.log(success);
      // this.signupDialogRef.close([]);
      this.router.navigate(['']);
    }).catch((err) => {
      this.error = err;
    });
  }

  onUserLoginWithFb() {
    this.signup.onLoginWithFb().then(
      (success) => {
      console.log(success);
      // this.signupDialogRef.close([]);
      this.router.navigate(['']);
    }).catch((err) => {
      this.error = err;
    });
  }


  close(showLoginModal: boolean): void {
    this.signupDialogRef.close(showLoginModal);
   }


}
