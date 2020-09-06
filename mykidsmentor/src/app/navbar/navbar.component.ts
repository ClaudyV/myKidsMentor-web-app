import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchKey: string; // Searck input

  constructor() { }

  ngOnInit(): void {
    const mkmHamburger = document.querySelector('.mkm-hamburger');
    const mkmNavLinks = document.querySelector('.mkm-nav-links');
    const links = document.querySelectorAll('.mkm-nav-links li');

    mkmHamburger.addEventListener('click', () => {
      mkmNavLinks.classList.toggle('open');
      mkmHamburger.classList.toggle('toggle');
      links.forEach(link => {

        link.classList.toggle('fade');
      });
    });
  }

  // This function clears the search input as soon as users click on close button
  onSearchClear() {
    this.searchKey = ''; // Empty the user input when you click on close button
  }

}
