import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-blog',
  templateUrl: './search-blog.component.html',
  styleUrls: ['./search-blog.component.css']
})
export class SearchBlogComponent implements OnInit {

  isSmallScreen: Observable<boolean>;
  shareSmallScreen: Observable<boolean>;
  articleActionBigScreen: Observable<boolean>;
  articleActionSmallScreen: Observable<boolean>;
  
  constructor(private sharedServe: SharedService,
              breakpointObserver: BreakpointObserver) {
    this.sharedServe.setQuotesValue(false);
    this.isSmallScreen = breakpointObserver.observe('(max-width: 985px)').pipe(map(result => !result.matches));
    this.articleActionBigScreen = breakpointObserver.observe('(max-width: 1400px)').pipe(map(result => !result.matches));
    this.articleActionSmallScreen = breakpointObserver.observe('(min-width: 1401px)').pipe(map(result => !result.matches));
   }

  ngOnInit(): void {
  }

}
