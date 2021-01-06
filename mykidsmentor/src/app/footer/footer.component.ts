import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  date = new Date();
  year;
  isSmallScreen: Observable<boolean>;
  smallHeight = '570px';
  bigHeightSignup = '680px';
  bigHeightLogin = '620px';
  matWidth = '515px';
  user: firebase.User;

  constructor(public dialog: MatDialog,private loginfo: AuthenticationService) { }

  

  ngOnInit(): void {
    this.year = this.date.getFullYear();
    this.loginfo.getCurrentUser()
        .subscribe(user => {
          if(user && user.emailVerified){
            this.user = user;
          }
           });
  }

  openLoginDialog() {

    this.dialog.open(LoginComponent, {
      height: this.isSmallScreen ? this.smallHeight : this.bigHeightLogin,
      width: this.matWidth,
    }).afterClosed().subscribe(
      showSignupModal => {
        showSignupModal && this.openSignupDialog();
        console.log(showSignupModal); }
    );

}

openSignupDialog() {

  const dialogRef = this.dialog.open(SignupComponent, {
    height: this.isSmallScreen ? this.smallHeight : this.bigHeightSignup,
    width: this.matWidth,
  }).afterClosed().subscribe(
    showLoginModal => {
      showLoginModal && this.openLoginDialog();
    }
    );
  }

}
