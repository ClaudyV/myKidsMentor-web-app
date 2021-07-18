import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/service/courses.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {

  currentRate = 4;
  urlTest = '../../assets/img/mkm-taiwan.jpg';
  keyWord:any;
  courses:any;

  constructor(private sharedServe: SharedService,
              private route: ActivatedRoute,
              private courseService: CoursesService) {
    this.sharedServe.setQuotesValue(false);
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      parms => {
        console.log(parms);
        this.keyWord = parms.keyword;
        this.getAllCourses();
      }
    );
  }

  get isZhuyinBool(){
    return this.sharedServe.isZhuyinService();
  }

  getAllCourses() {
    this.courseService.getAllCourses()
    .subscribe(
      courses => {
        this.filterSearch(courses);
      }
    );
  }

  filterSearch(data:any) {
    this.route.queryParams.subscribe(
      parms => {
        this.courses = [];
        data.filter(video => {
          if (this.compare(video.title, parms.keyword)) {
            this.courses.push(video);
          }
        });
      }
    );
  }

  compare(str1, str2, matches = []) {
    str1.replace(/([A-Za-z]|\p{Script=Hani})+/gu, m => str2.search(new RegExp(m, "i")) >= 0 && matches.push(m));
    return matches.length !== 0;
  }
}
