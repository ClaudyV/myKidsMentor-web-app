import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  keyWord;
  isSmallScreenValue: Observable<boolean>;
  courses:any;
  
  constructor(private sharedServe: SharedService,
              private router: Router,
              private route: ActivatedRoute,
              breakpointObserver: BreakpointObserver,
              private courseService: CoursesService) { 
    this.sharedServe.setQuotesValue(false);
    this.isSmallScreenValue = breakpointObserver.observe('(max-width: 959px)')
                .pipe(map(result => !result.matches));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      parms => {
        console.log(parms);
        this.keyWord = parms.keyword;
      }
    );
    this.sharedServe.setQuotesValue(false);
    this.getAllCourses();
  }

  routeIsActive(routePath: string) {
    return this.router.url.split('?')[0] === routePath;
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
          console.log(video.title.toLowerCase());
          if (this.compare(video.title.toLowerCase(), parms.keyword.toLowerCase())) {
            this.courses.push(video);
          }
        });
      }
    );
    console.log(this.courses);
  }

  compare(str1, str2, matches = []) {
    str1.replace(/([A-Za-z]|\p{Script=Hani})+/gu, m => str2.search(new RegExp(m, "i")) >= 0 && matches.push(m));
    return matches.length !== 0;
  }

}
