import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import course from '../../app/datajson/course.json';

@Component({
  selector: 'app-newcourse',
  templateUrl: './newcourse.component.html',
  styleUrls: ['./newcourse.component.css']
})
export class NewcourseComponent implements OnInit {

  courses = course.courses;
  currentRate  = 4;
  constructor(private sharedServe: SharedService) { }

  ngOnInit(): void {
    this.sharedServe.setQuotesValue(false);
  }

}
