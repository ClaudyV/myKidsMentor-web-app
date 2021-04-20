import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {

  currentRate = 4;
  urlTest = '../../assets/img/mkm-taiwan.jpg';

  constructor(private sharedServe: SharedService) {
    this.sharedServe.setQuotesValue(false);
   }

  ngOnInit(): void {
  }

  get isZhuyinBool(){
    return this.sharedServe.isZhuyinService();
  }

}
