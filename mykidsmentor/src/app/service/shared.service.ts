import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private zhuyin:boolean;

  constructor() { }

    setZhuyin(data:boolean) {
        this.zhuyin = data;
        console.log(this.zhuyin);
    }

    isZhuyinService() {
        return this.zhuyin;
    }

    set isZhuyin(value: boolean) {
      sessionStorage.setItem('isZhuyin', String(value));
    }

    get isZhuyin(): boolean {
        return <boolean> <unknown>sessionStorage.getItem('isZhuyin');
    }
}
