import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import course from '../../app/datajson/course.json';
import { CoursesService } from '../service/courses.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-newcourse',
  templateUrl: './newcourse.component.html',
  styleUrls: ['./newcourse.component.css']
})
export class NewcourseComponent implements OnInit {

  courses:any;
  currentRate  = 4;
  loading = true;
  loadingCount = 3;

  constructor(private sharedServe: SharedService,
              private courseService: CoursesService,
              breakpointObserver: BreakpointObserver) {
                breakpointObserver.observe(['(max-width: 1024px)',
                '(max-width: 650px)']).subscribe((state:BreakpointState) => {
                  this.loadingCount = 3;
                  if (state.breakpoints['(max-width: 1024px)']) {
                    this.loadingCount = 2;
                  } 
                  if(state.breakpoints['(max-width: 650px)']) {
                    this.loadingCount = 1;
                  }
                });
               }

  ngOnInit(): void {
    this.sharedServe.setQuotesValue(false);
    this.getAllCourses();
  }

  getAllCourses() {
    this.loading = true;
    this.courseService.getAllCourses()
    .subscribe(
      courses => {
        console.log(courses);
        this.courses = courses;
        this.loading = false;
      }
    );
  }

}
