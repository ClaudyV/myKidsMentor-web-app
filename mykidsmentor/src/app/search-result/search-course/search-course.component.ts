import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {

  constructor(private sharedServe: SharedService) {
    this.sharedServe.setQuotesValue(false);
   }

  ngOnInit(): void {
  }

}
