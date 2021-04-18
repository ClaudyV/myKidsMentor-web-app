import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  keyWord;
  constructor(private sharedServe: SharedService) { 
    this.sharedServe.setQuotesValue(false);
  }

  ngOnInit(): void {
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
  }

}
