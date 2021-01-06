import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from './../service/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import {BreakpointObserver} from '@angular/cdk/layout';
import { PwnotificationComponent } from './../pwnotification/pwnotification.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  error: any;
  isSmallScreen: boolean;
  isLoading: any;
  actionCodeSettings = {
    // After password reset, the user will be give the ability to go back
    // to this page.
    url: 'http://localhost:4200/',
    handleCodeInApp: false
  };

  constructor(public loginDialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public auth: AngularFireAuth,
              private login: AuthenticationService,
              private router: Router,
              public dialog: MatDialog,
              breakpointObserver: BreakpointObserver) {
                this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
                console.log(this.isSmallScreen);


              }

  ngOnInit(): void {

  }


  onUserLogin(formData?) {
    this.isLoading = true;
    this.login.onLogin(formData).then(
      (success) => {
        if (formData) {
          this.isLoading = false;
          this.loginDialogRef.close(false);
          this.router.navigate(['']);
        }
        console.log(success);

      }).catch(
      (err) => {
        this.isLoading = false;
        this.error = err;
      });
  }

  onUserLoginWithGoogle() {
    this.isLoading = true;
    this.login.onLoginWithGoogle().then(
      (success) => {
      this.isLoading = false;
      this.loginDialogRef.close(false);
      console.log(success);
      this.router.navigate(['']);
    }).catch((err) => {
      this.isLoading = false;
      this.error = err;
    });
  }

  onUserLoginWithFb() {
    this.isLoading = true;
    this.login.onLoginWithFb().then(
      (success) => {
      this.isLoading = false;
      this.loginDialogRef.close(false);
      console.log(success);
      this.router.navigate(['']);
    }).catch((err) => {
      this.isLoading = false;
      this.error = err;
    });
  }

  resetUserPassword(formData, actionCodeSettings) {
    this.isLoading = true;
    this.login.resetPassword(formData.email, actionCodeSettings).then(
      (success) => {
      this.isLoading = false;
      this.loginDialogRef.close(false);
      this.dialog.open(PwnotificationComponent, {
        panelClass : 'verifyClass',
        data: {userEmail: formData.email}
      }).afterClosed().subscribe(
        result => {}
      );
      console.log(success);
    }).catch((err) => {
      this.isLoading = false;
      this.error = err;
    });
  }

  logout() {
    this.isLoading = true;
    this.login.logout().then(
      (success) => {
      this.isLoading = false;
      this.router.navigate(['']);
    }).catch((err) => {
      this.error = err;
    });
  }

  close(showSignupModal: boolean): void {
    this.loginDialogRef.close(showSignupModal);
   }


}
