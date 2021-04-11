import { Component, OnInit } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  isSmallScreen: Observable<boolean>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = breakpointObserver.observe('(max-width: 930px)').pipe(map(result => !result.matches));
    console.log(this.isSmallScreen);
   }

  ngOnInit(): void {
  }

}
