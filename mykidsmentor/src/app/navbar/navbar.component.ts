import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from './../service/authentication.service';
import { SignupComponent } from './../signup/signup.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import { SharedService } from '../service/shared.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

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
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger })
  autoComplete: MatAutocompleteTrigger;
  searching: boolean = true;
  userDb;


  constructor(public dialog: MatDialog,
              private loginfo: AuthenticationService,
              breakpointObserver: BreakpointObserver, 
              private sharedServe: SharedService,
              private router: Router,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private courseService: CoursesService) {
                this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
              }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.getAllCourses();
    this.navbarEvent();
    this.loginfo.getCurrentUser()
        .subscribe(user => {
          if(user && user.emailVerified){
            this.user = user;
          }
           });

    this.loginfo.getCurrentUser()
        .pipe(
          switchMap(user => {
            return  this.loginfo.getCurrentUserDb();
          }),
          map(user => user)
        )
        .subscribe(user => {
          if(user){
            this.userDb = user;
          }
        });
    window.addEventListener('scroll', this.scrollEvent, true);
  
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationStart) {
          this.sharedServe.setQuotesValue(true);
          this.sharedServe.currentSearching.subscribe(
            (value) => {
              this.searching = value;
              this.cdr.detectChanges();
            }
          );
        }
      });

  }

  getAllCourses() {
    this.courseService.getAllCourses()
    .subscribe(
      courses => {
        console.log(courses);
        this.filterName(courses);
      }
    );
  }

  filterName(data:any) {
    this.options = [];
    data.filter(course => {
      this.options.push(course.title);
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  scrollEvent = (event: any): void => {
    if(this.autoComplete.panelOpen)
      this.autoComplete.closePanel();
      // this.autoComplete.updatePosition();
  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0).slice(0, 4);
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

    this.dialog.open(SignupComponent, {
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
    this.myControl.reset('');
  }

  searchMade(event) {
    this.sharedServe.setSearchKeyWord(event.value);
    this.router.navigate(['search-result/course'], {queryParams : {keyword: event.value}});
    this.sharedServe.setQuotesValue(false);
  }

  inputOnEnter(event) {
    this.sharedServe.setSearchKeyWord(this.myControl.value);
    this.router.navigate(['search-result/course'], {queryParams : {keyword: this.myControl.value}});
    this.sharedServe.setQuotesValue(false);
  }

}
