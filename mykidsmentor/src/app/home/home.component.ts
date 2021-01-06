import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import lottie from 'lottie-web';
import { SharedService } from '../service/shared.service';

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
  board;
  saveScroll;
  isZhuyin: boolean;
  iscurrentPlayer;
  isCurrentPlayerValue;
  @ViewChild('myCourses') myCourses: ElementRef;
  @ViewChild('newCourses') newCourses: ElementRef;
  @ViewChild('scrollBehavior') scrollBehavior: ElementRef;
  

  constructor(private title: Title,
              private meta: Meta,
              public dialog: MatDialog,
              breakpointObserver: BreakpointObserver, 
              private sharedServ: SharedService) {
                this.isSmallScreen = breakpointObserver.observe('(max-width: 599px)').pipe(map(result => !result.matches));
                this.isSmallScreenValue = breakpointObserver.observe('(max-width: 959px)')
                .pipe(map(result => !result.matches));
                this.isSmallScreenBanner = breakpointObserver.observe('(max-width: 700px)')
                .pipe(map(result => !result.matches));
                // this.isZhuyin = this.sharedServ.isZhuyinService();
                // console.log(this.isZhuyin)
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

    this.connectFourGame();

    this.introAnimation();

    this.getCurrentGamePosition();
  }



  
  getCurrentGamePosition(){
    let reloading = sessionStorage.getItem('scrollTop')

    if(reloading){
      document.body.scrollTop = 1400;
      sessionStorage.removeItem('scrollTop');
    }
  }

  get isZhuyinBool(){
    return this.sharedServ.isZhuyinService();
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

connectFourGame(){
  // Create variables for use in our game.
  var Game: any = {};

  // Global game config
  Game.config = {
    startingPlayer: "black", // Choose 'black' or 'red'.
    takenMsg: "This position is already taken. Please make another choice.",
    drawMsg: "This game is a draw.",
    winMsg: "The winner is: ",
    countToWin: 4,

    // note: board dimensions are zero-indexed
    boardLength: 6,
    boardHeight: 5,
  };

  // Global Game State
  Game.board = [[0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]];

  Game.currentPlayer = Game.config.startingPlayer;


  // General-purpose actions in the game.

  Game.do = (function() {
    /**
     * A function for adding a disc to our Connect Four board state.
     *
     * @param number x_pos The x-position of the location chosen.
     * @param number y_pos The y-position of the location chosen.
     */
    function addDiscToBoard(x_pos, y_pos) {
      Game.board[y_pos][x_pos] = Game.currentPlayer;
    }

    /**
     * Print the contents of our Game.board state to the html page.
     */
    function printBoard() {
      var row, cell;
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        for (var x = 0; x <= Game.config.boardLength; x++) {
          if (Game.check.isPositionTaken(x, y)) {
            row = document.querySelector('tr:nth-child(' + (1 + y) + ')');
            cell = row.querySelector('td:nth-child(' + (1 + x) + ')');
            cell.firstElementChild.classList.add(Game.board[y][x]);
          }
        }
      }
    }

    /**
     * A function for changing players both in state and on the screen.
     */
    function changePlayer() {
      var currentPlayerNameEl = document.querySelector('#current-player');
      var otherPlayerNameEl = document.querySelector('#other-player');

      // Switch players
      var otherPlayer = Game.currentPlayer
      var otherPlayerName = currentPlayerNameEl.textContent;
      var currentPlayerName = otherPlayerNameEl.textContent;
      Game.currentPlayer = (Game.currentPlayer === 'black') ? 'red' : 'black';
      this.iscurrentPlayer = Game.currentPlayer;
      if(this.iscurrentPlayer === 'red'){
        this.isCurrentPlayerValue = true;
      } else{
        this.isCurrentPlayerValue = false;
      }
      console.log(this.iscurrentPlayer);


      // Update the players in the UI.
      currentPlayerNameEl.classList.remove(otherPlayer);
      currentPlayerNameEl.classList.add(Game.currentPlayer);
      currentPlayerNameEl.textContent = currentPlayerName;

      otherPlayerNameEl.classList.remove(Game.currentPlayer);
      otherPlayerNameEl.classList.add(otherPlayer);
      otherPlayerNameEl.textContent = otherPlayerName;

    }

    /**
     * If there are empty positions below the one chosen, return the new y-position
     * we should drop the piece to.
     *
     * @param number x_pos The x-position of the location chosen.
     * @param number y_pos The y-position of the location chosen.
     * @return number - The y-position the disc should fall into.
     */
    function dropToBottom(x_pos, y_pos) {
      // Start at the bottom of the column, and step up, checking to make sure
      // each position has been filled. If one hasn't, return the empty position.
      for (var y = Game.config.boardHeight; y > y_pos; y--) {
        if (!Game.check.isPositionTaken(x_pos, y)) {
          return y;
        }
      }
      return y_pos;
    }

    /**
     * Handle edge-cases in name changes
     * @param event
     */
    function handleNameChange(event) {
      // Prevent the default "newline" behavior when hitting "Enter"
      if (event.keyCode === 13) {
        event.preventDefault();
        document.body.focus();
      }
    }

    return {
      addDiscToBoard,
      printBoard,
      changePlayer,
      dropToBottom,
      handleNameChange
    };
  })();



  // General-purpose status checks for the game.

  Game.check = (function() {
    /**
     * Test to ensure the chosen location isn't taken.
     *
     * @param number x_pos The x-position of the location chosen.
     * @param number y_pos The y-position of the location chosen.
     * @return bool returns true or false for the question "Is this spot taken?".
     */
    function isPositionTaken(x_pos, y_pos) {
      return Game.board[y_pos][x_pos] !== 0;
    }

    /**
     * Determine if the game is a draw (all peices on the board are filled).
     *
     * @return bool Returns true or false for the question "Is this a draw?".
     */
    function isGameADraw() {
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        for (var x = 0; x <= Game.config.boardLength; x++) {
          if (!isPositionTaken(x, y)) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * Test to see if somebody got four consecutive horizontal pieces.
     *
     * @return bool Returns true if a win was found, and otherwise false.
     */
    function isHorizontalWin() {
      var currentValue = null,
          previousValue = 0,
          tally = 0;

      // Scan each row in series, tallying the length of each series. If a series
      // ever reaches four, return true for a win.
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        for (var x = 0; x <= Game.config.boardLength; x++) {
          currentValue = Game.board[y][x];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // Reset the tally if you find a gap.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
        }

        // After each row, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
      }

      // No horizontal win was found.
      return false;
    }

    /**
     * Test to see if somebody got four consecutive vertical pieces.
     *
     * @return bool Returns true if a win was found, and otherwise false.
     */
    function isVerticalWin() {
      var currentValue = null,
          previousValue = 0,
          tally = 0;

      // Scan each column in series, tallying the length of each series. If a
      // series ever reaches four, return true for a win.
      for (var x = 0; x <= Game.config.boardLength; x++) {
        for (var y = 0; y <= Game.config.boardHeight; y++) {
          currentValue = Game.board[y][x];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // Reset the tally if you find a gap.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
        }

        // After each column, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
      }

      // No vertical win was found.
      return false;
    }

    /**
     * Test to see if somebody got four consecutive diagonel pieces.
     *
     * @return bool Returns true if a win was found, and otherwise false.
     */
    function isDiagonalWin() {
      var x = null,
          y = null,
          xtemp = null,
          ytemp = null,
          currentValue = null,
          previousValue = 0,
          tally = 0;

      // Test for down-right diagonals across the top.
      for (x = 0; x <= Game.config.boardLength; x++) {
        xtemp = x;
        ytemp = 0;

        while (xtemp <= Game.config.boardLength && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // Reset the tally if you find a gap.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;

          // Shift down-right one diagonal index.
          xtemp++;
          ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
      }

      // Test for down-left diagonals across the top.
      for (x = 0; x <= Game.config.boardLength; x++) {
        xtemp = x;
        ytemp = 0;

        while (0 <= xtemp && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // Reset the tally if you find a gap.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;

          // Shift down-left one diagonal index.
          xtemp--;
          ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
      }

      // Test for down-right diagonals down the left side.
      for (y = 0; y <= Game.config.boardHeight; y++) {
        xtemp = 0;
        ytemp = y;

        while (xtemp <= Game.config.boardLength && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // Reset the tally if you find a gap.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;

          // Shift down-right one diagonal index.
          xtemp++;
          ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
      }

      // Test for down-left diagonals down the right side.
      for (y = 0; y <= Game.config.boardHeight; y++) {
        xtemp = Game.config.boardLength;
        ytemp = y;

        while (0 <= xtemp && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // Reset the tally if you find a gap.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;

          // Shift down-left one diagonal index.
          xtemp--;
          ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
      }

      // No diagonal wins found. Return false.
      return false;
    }

  return {
    isPositionTaken,
    isGameADraw,
    isHorizontalWin,
    isVerticalWin,
    isDiagonalWin
  }

  })();

  (function () {
    // Manage focus rings on the playing board
    var styleEl = document.querySelector('#a11y-styles') as HTMLInputElement;

    
      // document.addEventListener('mousedown', () => styleEl.innerHTML = '');  
      document.addEventListener('keydown', () => {
        styleEl.innerHTML = '.board button:focus{border:5px solid #999}'}); 
   
    
    
  
    // Add arrow-key navigation to the playing board
    document.onkeydown = function(e: any) {
      e = e || window.event;
  
      var arrowKeyCodes = [37, 38, 39, 40];
      var isKeypressArrowKey = (arrowKeyCodes.indexOf(e.keyCode) >= 0);
      var isBoardButtonActive = (document.activeElement.tagName == 'BUTTON');
      var isContentEditableActiveTemp = (document.activeElement as HTMLElement)
      var isContentEditableActive = isContentEditableActiveTemp.isContentEditable;

  
      if (!isKeypressArrowKey || isContentEditableActive) {
        return;
      }
  
      if (!isBoardButtonActive) {
        // Focus on the first board location (top-left).
        (document.querySelector('#board button') as HTMLInputElement).focus();
      } else {
        var activeCell = (document.activeElement as HTMLElement).parentElement;
        var activeRow = activeCell.parentElement;
        var activeRowCells = [...activeRow.children];
        var activeCellIndex = activeRowCells.indexOf(activeCell);
  
        if (e.keyCode === 38) {
          var rowBefore = activeRow.previousElementSibling;
          if (rowBefore) (rowBefore.children[activeCellIndex].firstElementChild as HTMLInputElement).focus();
        }
        else if (e.keyCode === 40) {
          var rowAfter = activeRow.nextElementSibling;
          if (rowAfter) (rowAfter.children[activeCellIndex].firstElementChild as HTMLInputElement).focus();
        }
        else if (e.keyCode === 37) {
          var cellBefore = activeCell.previousElementSibling;
          if (cellBefore) (cellBefore.firstElementChild as HTMLInputElement).focus();
        }
        else if (e.keyCode === 39) {
          var cellAfter = activeCell.nextElementSibling;
          if (cellAfter) (cellAfter.firstElementChild as HTMLInputElement).focus();
        }
      };
    }
  })();
  

  // Setup the main game logic.

(function () {
  var prefixEl = document.querySelector('#prefix');
  var primaryTextEl = document.querySelector('.primary');
  var secondaryTextEl = document.querySelector('.secondary');
  var currentPlayerNameEl: any = document.querySelector('#current-player');
  var otherPlayerNameEl = document.querySelector('#other-player');
  var playAgainEl = document.querySelector('#play-again');
  var playAgainBtnEl = document.querySelector('#play-again-btn');
  var gameBoardEl = document.querySelector('#board');
  playAgainBtnEl.addEventListener('click', () => {
    
    // console.log(parseInt(sessionStorage.getItem('scrollTop')));
    // document.body.scrollTop = 1400;
    sessionStorage.setItem("scrollTop", String(document.body.scrollTop));
    location.reload();
    
  });
  gameBoardEl.addEventListener('click', placeGamePiece);
  currentPlayerNameEl.addEventListener("keydown", Game.do.handleNameChange);
  otherPlayerNameEl.addEventListener("keydown", Game.do.handleNameChange);

  function placeGamePiece(e) {
    if (e.target.tagName !== 'BUTTON') return;

    var targetCell = e.target.parentElement;
    var targetRow = targetCell.parentElement;
    var targetRowCells = [...targetRow.children];
    var gameBoardRowsEls = [...document.querySelectorAll('#board tr')];

    // Detect the x and y position of the button clicked.
    var y_pos = gameBoardRowsEls.indexOf(targetRow);
    var x_pos = targetRowCells.indexOf(targetCell);

    // Ensure the piece falls to the bottom of the column.
    y_pos = Game.do.dropToBottom(x_pos, y_pos);

    if (Game.check.isPositionTaken(x_pos, y_pos)) {
      alert(Game.config.takenMsg);
      return;
    }

    // Add the piece to the board.
    Game.do.addDiscToBoard(x_pos, y_pos);
    Game.do.printBoard();

    // Check to see if we have a winner.
    if (Game.check.isVerticalWin() || Game.check.isHorizontalWin() || Game.check.isDiagonalWin()) {
      gameBoardEl.removeEventListener('click', placeGamePiece);
      prefixEl.textContent = Game.config.winMsg;
      currentPlayerNameEl.contentEditable = false;
      secondaryTextEl.remove();
      playAgainEl.classList.add('show');
      return;
    } else if (Game.check.isGameADraw()) {
      gameBoardEl.removeEventListener('click', placeGamePiece);
      primaryTextEl.textContent = Game.config.drawMsg;
      secondaryTextEl.remove();
      playAgainEl.classList.add('show');
      return;
    }

    // Change player.
    Game.do.changePlayer();
  };

})();


 
}

introAnimation(){

  let anim = document.getElementById('mkm-intro-animation');
  lottie.loadAnimation({
    container: anim, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/data/data.json' // the path to the animation json
  });

}

}
