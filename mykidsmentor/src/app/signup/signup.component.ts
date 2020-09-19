import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from './../service/authentication.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  error: any;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(public signupDialogRef: MatDialogRef<SignupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public auth: AngularFireAuth,
              private signup: AuthenticationService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  onSubmit(formData) {
    // this.dataLoading = true;
    this.signup.createUser(formData).then(
      (success) => {
      console.log(success);
      this.signupDialogRef.close([]);
      this.router.navigate(['']);
    }).catch(
      (err) => {
      console.log(err);
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
