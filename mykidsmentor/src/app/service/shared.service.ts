import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private zhuyin:boolean;
  private keyWord = new BehaviorSubject('');
  currentKeyWord = this.keyWord.asObservable();
  private searching = new BehaviorSubject(true);
  currentSearching = this.searching.asObservable();

  constructor() { }

    setZhuyin(data:boolean) {
      this.zhuyin = data;
    }

    isZhuyinService() {
      return this.zhuyin;
    }

    setSearchKeyWord(keyWord: string) {
      this.keyWord.next(keyWord);
    }

    setQuotesValue(data: boolean) {
      this.searching.next(data);
    }

    getQuotesValue() {
      return this.searching;
    }
    
}
