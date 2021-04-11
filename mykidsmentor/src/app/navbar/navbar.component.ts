import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from './../service/authentication.service';
import { SignupComponent } from './../signup/signup.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import { SharedService } from '../service/shared.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchKey: string; // Searck input
  user: firebase.User;
  userVerified;
  isSmallScreen: boolean;
  smallHeight = '570px';
  bigHeightSignup = '680px';
  bigHeightLogin = '620px';
  matWidth = '515px';
  dateNow = new Date();
  yearNav = this.dateNow.getFullYear();
  monthNav = this.dateNow.getMonth() + 1;
  dayNav = this.dateNow.getDate();
  zhuyinValue;
  toggleValue = false;
  mouseOut = false;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger })
  autoComplete: MatAutocompleteTrigger;


  constructor(public dialog: MatDialog,
              private loginfo: AuthenticationService,
              breakpointObserver: BreakpointObserver, 
              private sharedServe: SharedService) {
                this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
              }

  ngOnInit(): void {

    this.navbarEvent();

    this.loginfo.getCurrentUser()
        .subscribe(user => {
          if(user && user.emailVerified){
            this.user = user;
          }
           });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    if(this.autoComplete.panelOpen)
      this.autoComplete.closePanel();
      // this.autoComplete.updatePosition();
  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  isZhuyin(event){
    console.log(event.target.checked);
    if(event.target.checked){
      this.zhuyinValue = true;
      this.sharedServe.setZhuyin(this.zhuyinValue);
    }
  }

  isNotZhuyin(event){
    console.log(event.target.checked);
    if(event.target.checked){
      this.zhuyinValue = false;
      this.sharedServe.setZhuyin(this.zhuyinValue);
    }
  }

  userLogout() {
    this.loginfo.logout();
  }


  navbarEvent () {
    const mykidsmentorHamburger = document.querySelector('.mykidsmentor-hamburger');
    const mykidsmentorNavLinks = document.querySelector('.mykidsmentor-nav-links');
    const links = document.querySelectorAll('.mykidsmentor-nav-links li');
    mykidsmentorHamburger.addEventListener('click', () => {
      this.toggleValue = !this.toggleValue;
      mykidsmentorNavLinks.classList.toggle('open');
      mykidsmentorHamburger.classList.toggle('toggle');
      links.forEach(link => {
        link.classList.toggle('fade');
      });
    });
  }


  openLoginDialog() {

        this.dialog.open(LoginComponent, {
          height: this.isSmallScreen ? this.smallHeight : this.bigHeightLogin,
          width: this.matWidth,
        }).afterClosed().subscribe(
          showSignupModal => {
            showSignupModal && this.openSignupDialog();
          console.log(showSignupModal)}
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


  // This function clears the search input as soon as users click on close button
  onSearchClear() {
    this.searchKey = ''; // Empty the user input when you click on close button
  }

}
