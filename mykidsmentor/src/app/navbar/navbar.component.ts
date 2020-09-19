import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from './../service/authentication.service';
import { SignupComponent } from './../signup/signup.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import { PwnotificationComponent } from '../pwnotification/pwnotification.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchKey: string; // Searck input
  user: firebase.User;
  isSmallScreen: boolean;
  smallHeight = '570px';
  bigHeight = '700px';
  matWidth = '515px';

  constructor(public dialog: MatDialog,
              private loginfo: AuthenticationService,
              breakpointObserver: BreakpointObserver) {
                this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
              }

  ngOnInit(): void {

    this.navbarEvent();

    this.loginfo.getCurrentUser()
        .subscribe(user => this.user = user);
  }

  userLogout() {
    this.loginfo.logout();
  }


  navbarEvent () {
    const mykidsmentorHamburger = document.querySelector('.mykidsmentor-hamburger');
    const mykidsmentorNavLinks = document.querySelector('.mykidsmentor-nav-links');
    const links = document.querySelectorAll('.mykidsmentor-nav-links li');

    mykidsmentorHamburger.addEventListener('click', () => {
      mykidsmentorNavLinks.classList.toggle('open');
      mykidsmentorHamburger.classList.toggle('toggle');
      // myKidsMentorLogo.classList.add('mykidsmentor-logo-size-change');

      links.forEach(link => {
        link.classList.toggle('fade');
      });
    });
  }


  openLoginDialog() {

        this.dialog.open(LoginComponent, {
          height: this.isSmallScreen ? this.smallHeight : this.bigHeight,
          width: this.matWidth,
        }).afterClosed().subscribe(
          showSignupModal => showSignupModal && this.openSignupDialog()
        );

  }

  openSignupDialog() {

    this.dialog.open(SignupComponent, {
      height: this.isSmallScreen ? this.smallHeight : this.bigHeight,
      width: this.matWidth,
    }).afterClosed().subscribe(
      showLoginModal => showLoginModal && this.openLoginDialog()
      );
  }


  // This function clears the search input as soon as users click on close button
  onSearchClear() {
    this.searchKey = ''; // Empty the user input when you click on close button
  }

}
