import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CoursesService } from 'src/app/service/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from 'src/app/users/admin-courses/course-dialog/course-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UsersService } from 'src/app/service/users.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {

  courses:MatTableDataSource<any>;
  displayedColumns: string[] = ['url', 'title', 'desc', 'category', 'time', 'author', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  adminUsers:any;
  
  constructor(private courseService: CoursesService,
              private dialogService: MatDialog,
              private loginfo: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseService.getAllCourses()
    .subscribe(
      courses => {
        this.dataManage(courses);
      }
    );
  }

  dataManage(courses) {
    this.courses = new MatTableDataSource(courses);
    this.sortAndPaginator();
  }
  
  sortAndPaginator() {
    this.courses.paginator = this.paginator;
    this.courses.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.courses.filter = filterValue.trim().toLowerCase();

    if (this.courses.paginator) {
      this.courses.paginator.firstPage();
    }
  }

  addCourse() {
    this.dialogService.open(CourseDialogComponent,{
      width:'1000px',
    })
  }

  edit(row: any) {
    this.dialogService.open(CourseDialogComponent,{
      width:'1000px',
      data:{id:row.key}
    })
  }

  delete(row:any) {
    if(window.confirm('Are sure you want to delete this course ?')) {
      this.courseService.deleteCourse(row.key);
    }
  }

}
