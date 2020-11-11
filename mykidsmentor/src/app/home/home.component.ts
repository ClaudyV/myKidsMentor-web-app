import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isSmallScreenValue: Observable<boolean>;
  isSmallScreen: Observable<boolean>;
  isSmallScreenBanner: Observable<boolean>;
  smallHeight = '570px';
  bigHeightSignup = '680px';
  bigHeightLogin = '620px';
  matWidth = '515px';
  currentRate = 4;
  backgroudImage = '../../assets/img/mkm-taiwan.jpg';
  @ViewChild('myCourses') myCourses: ElementRef;
  @ViewChild('newCourses') newCourses: ElementRef;

  constructor(private title: Title,
              private meta: Meta,
              public dialog: MatDialog,
              breakpointObserver: BreakpointObserver) {
                this.isSmallScreen = breakpointObserver.observe('(max-width: 599px)').pipe(map(result => !result.matches));
                this.isSmallScreenValue = breakpointObserver.observe('(max-width: 959px)')
                .pipe(map(result => !result.matches));
                this.isSmallScreenBanner = breakpointObserver.observe('(max-width: 700px)')
                .pipe(map(result => !result.matches));
              }

  ngOnInit(): void {
    this.title.setTitle('Home | My kid' + 's Mentor');
    this.meta.addTags([
      { name: 'og:url', content: '/' },
      { name: 'og:title', content: 'Home | My kid' + 's Mentor' },
      { name: 'og:description', content: 'This is our description' },
      // { name: 'og:image', content: this.data.image }
    ]);


    this.myCoursesSlider();

    this.newCoursesSlider();
  }

  myCoursesSlider(){
      // paddles
    const leftArrow = document.getElementById('mycourse-left-arrow');
    const rightArrow = document.getElementById('mycourse-right-arrow');
    // const leftArrow = document.getElementsByClassName('mkm-left-arrow');
    // const rightArrow = document.getElementsByClassName('mkm-right-arrow');

      // get items dimensions
    // const itemsLength = $('#mkm-video-mycourse').length;
    // const itemSize = $('#mkm-video-mycourse').outerWidth(true);

    const itemsLength = $('.mkm-video-mycourse').length;
    const itemSize = $('.mkm-video-mycourse').outerWidth(true);
      // get some relevant size for the paddle triggering point
    const paddleMargin = 20;

      // get wrapper width
    const getMenuWrapperSize = function() {
        return $('#mkm-wrap-video-mycourse').outerWidth();
      };
    let menuWrapperSize = getMenuWrapperSize();
      // the wrapper is responsive
    $(window).on('resize', function() {
        menuWrapperSize = getMenuWrapperSize();
      });
      // size of the visible part of the menu is equal as the wrapper size
    const menuVisibleSize = menuWrapperSize;

      // get total width of all menu items
    const getMenuSize = function() {
        return itemsLength * itemSize;
      };
    const menuSize = getMenuSize();
      // get how much of menu is invisible
    let menuInvisibleSize = menuSize - menuWrapperSize;

      // get how much have we scrolled to the left
    const getMenuPosition = function() {
        return $('#mkm-wrap-video-inside-mycourse').scrollLeft();
      };

      // finally, what happens when we are actually scrolling the menu
    $('#mkm-wrap-video-inside-mycourse').on('scroll', function() {

        // get how much of menu is invisible
        menuInvisibleSize = menuSize - menuWrapperSize;
        // get how much have we scrolled so far
        const menuPosition = getMenuPosition();

        const menuEndOffset = menuInvisibleSize - paddleMargin;

        // show & hide the paddles
        // depending on scroll position
        if (menuPosition <= paddleMargin) {
          $(leftArrow).addClass('hidden');
          $(rightArrow).removeClass('hidden');
        } else if (menuPosition < menuEndOffset) {
          // show both paddles in the middle
          $(leftArrow).removeClass('hidden');
          $(rightArrow).removeClass('hidden');
        } else if (menuPosition >= menuEndOffset) {
          $(leftArrow).removeClass('hidden');
          $(rightArrow).addClass('hidden');
      }

      });
  }

  newCoursesSlider(){
    // paddles
    const leftArrow = document.getElementById('newcourse-left-arrow');
    const rightArrow = document.getElementById('newcourse-right-arrow');
    // get items dimensions
    const itemsLength = $('.mkm-video-newcourse').length;
    const itemSize = $('.mkm-video-newcourse').outerWidth(true);
    // get some relevant size for the paddle triggering point
    const paddleMargin = 20;

    // get wrapper width
    const getMenuWrapperSize = function() {
      return $('#mkm-wrap-video-newcourse').outerWidth();
    };
    let menuWrapperSize = getMenuWrapperSize();
    // the wrapper is responsive
    $(window).on('resize', function() {
      menuWrapperSize = getMenuWrapperSize();
    });
    // size of the visible part of the menu is equal as the wrapper size
    const menuVisibleSize = menuWrapperSize;

    // get total width of all menu items
    const getMenuSize = function() {
      return itemsLength * itemSize;
    };
    const menuSize = getMenuSize();
    // get how much of menu is invisible
    let menuInvisibleSize = menuSize - menuWrapperSize;

    // get how much have we scrolled to the left
    const getMenuPosition = function() {
      return $('#mkm-wrap-video-inside-newcourse').scrollLeft();
    };

    // finally, what happens when we are actually scrolling the menu
    $('#mkm-wrap-video-inside-newcourse').on('scroll', function() {

      // get how much of menu is invisible
      menuInvisibleSize = menuSize - menuWrapperSize;
      // get how much have we scrolled so far
      const menuPosition = getMenuPosition();

      const menuEndOffset = menuInvisibleSize - paddleMargin;

      // show & hide the paddles
      // depending on scroll position
      if (menuPosition <= paddleMargin) {
        $(leftArrow).addClass('hidden');
        $(rightArrow).removeClass('hidden');
      } else if (menuPosition < menuEndOffset) {
        // show both paddles in the middle
        $(leftArrow).removeClass('hidden');
        $(rightArrow).removeClass('hidden');
      } else if (menuPosition >= menuEndOffset) {
        $(leftArrow).removeClass('hidden');
        $(rightArrow).addClass('hidden');
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

myCoursescrollLeft(){
  this.myCourses.nativeElement.scrollLeft -= 380;
}

myCoursescrollRight(){
  this.myCourses.nativeElement.scrollLeft += 380;
}

newCoursescrollLeft(){
  this.newCourses.nativeElement.scrollLeft -= 380;
}

newCoursescrollRight(){
  this.newCourses.nativeElement.scrollLeft += 380;
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

// connectFourGaem(){

//   // Create variables for use in our game.
// const Game: any = {};

// // Global game config
// Game.config = {
//   startingPlayer: 'black', // Choose 'black' or 'red'.
//   takenMsg: 'This position is already taken. Please make another choice.',
//   drawMsg: 'This game is a draw.',
//   winMsg: 'The winner is: ',
//   countToWin: 4,

//   // note: board dimensions are zero-indexed
//   boardLength: 6,
//   boardHeight: 5,
// };

// // Global Game State
// Game.board = [[0, 0, 0, 0, 0, 0, 0],
//               [0, 0, 0, 0, 0, 0, 0],
//               [0, 0, 0, 0, 0, 0, 0],
//               [0, 0, 0, 0, 0, 0, 0],
//               [0, 0, 0, 0, 0, 0, 0],
//               [0, 0, 0, 0, 0, 0, 0]];

// Game.currentPlayer = Game.config.startingPlayer;


// const prefixEl = document.querySelector('#prefix');
// const primaryTextEl = document.querySelector('.primary');
// const secondaryTextEl = document.querySelector('.secondary');
// const currentPlayerNameEl = document.querySelector('#current-player');
// const otherPlayerNameEl = document.querySelector('#other-player');
// const playAgainEl = document.querySelector('#play-again');
// const playAgainBtnEl = document.querySelector('#play-again-btn');
// const gameBoardEl = document.querySelector('#board');

// // playAgainBtnEl.addEventListener('click', () => location.reload());
// // gameBoardEl.addEventListener('click', placeGamePiece);
// // currentPlayerNameEl.addEventListener("keydown", Game.do.handleNameChange);
// // otherPlayerNameEl.addEventListener("keydown", Game.do.handleNameChange);

// // function placeGamePiece(e) {
// //     if (e.target.tagName !== 'BUTTON') { return; }

// //     const targetCell = e.target.parentElement;
// //     const targetRow = targetCell.parentElement;
// //     const targetRowCells = [...targetRow.children];
// //     const gameBoardRowsEls = [...document.querySelectorAll('#board tr')];

// //     // Detect the x and y position of the button clicked.
// //     let y_pos = gameBoardRowsEls.indexOf(targetRow);
// //     let x_pos = targetRowCells.indexOf(targetCell);

// //     // Ensure the piece falls to the bottom of the column.
// //     y_pos = Game.do.dropToBottom(x_pos, y_pos);

// //     if (Game.check.isPositionTaken(x_pos, y_pos)) {
// //       alert(Game.config.takenMsg);
// //       return;
// //     }

// //     // Add the piece to the board.
// //     Game.do.addDiscToBoard(x_pos, y_pos);
// //     Game.do.printBoard();

// //     // Check to see if we have a winner.
// //     if (Game.check.isVerticalWin() || Game.check.isHorizontalWin() || Game.check.isDiagonalWin()) {
// //       gameBoardEl.removeEventListener('click', placeGamePiece);
// //       prefixEl.textContent = Game.config.winMsg;
// //       currentPlayerNameEl.contentEditable = false;
// //       secondaryTextEl.remove();
// //       playAgainEl.classList.add('show');
// //       return;
// //     } else if (Game.check.isGameADraw()) {
// //       gameBoardEl.removeEventListener('click', placeGamePiece);
// //       primaryTextEl.textContent = Game.config.drawMsg;
// //       secondaryTextEl.remove();
// //       playAgainEl.classList.add('show');
// //       return;
// //     }

// //     // Change player.
// //     Game.do.changePlayer();

// // }

// }

}
