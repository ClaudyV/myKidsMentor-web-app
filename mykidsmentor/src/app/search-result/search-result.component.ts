import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  keyWord;
  isSmallScreenValue: Observable<boolean>;
  
  constructor(private sharedServe: SharedService,
              private router: Router,
              breakpointObserver: BreakpointObserver) { 
    this.sharedServe.setQuotesValue(false);
    this.isSmallScreenValue = breakpointObserver.observe('(max-width: 959px)')
                .pipe(map(result => !result.matches));
  }

  ngOnInit(): void {
    this.sharedServe.setQuotesValue(false);
    this.sharedServe.currentKeyWord.subscribe(
      (keyWord) => {
        this.keyWord = keyWord;
        sessionStorage.setItem('keyWord', keyWord);
        console.log(keyWord);
      }
      );

    if(sessionStorage.getItem('searchResult')) {
      this.keyWord = sessionStorage.getItem('searchResult');
    }

    console.log(this.router.url);
    
  }

  routeIsActive(routePath: string) {
    return this.router.url === routePath;
  }

  get isZhuyinBool(){
    return this.sharedServe.isZhuyinService();
  }

}
