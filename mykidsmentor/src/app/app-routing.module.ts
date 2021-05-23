import { UsersComponent } from './users/users.component';
import { AuthenticationService } from './service/authentication.service';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountinfoComponent } from './users/accountinfo/accountinfo.component';
import { BlogComponent } from './users/blog/blog.component';
import { ChangepasswordComponent } from './users/changepassword/changepassword.component';
import { MycourseComponent } from './users/mycourse/mycourse.component';
import { CoursehistoryComponent } from './users/coursehistory/coursehistory.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchCourseComponent } from './search-result/search-course/search-course.component';
import { SearchBlogComponent } from './search-result/search-blog/search-blog.component';
import { NewcourseComponent } from './newcourse/newcourse.component';
import { PopularcourseComponent } from './popularcourse/popularcourse.component';
import { AdminCoursesComponent } from './users/admin-courses/admin-courses.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'course', component: CourseComponent, canActivate: [AuthenticationService] },
  { path: 'new-course', component: NewcourseComponent, canActivate: [AuthenticationService] },
  { path: 'popular-course', component: PopularcourseComponent, canActivate: [AuthenticationService] },
  { path: 'user', redirectTo : 'user/account-info'},
  { path: 'user', component: UsersComponent, canActivate: [AuthenticationService],
    children: [
      { path: 'account-info', component: AccountinfoComponent, canActivate: [AuthenticationService] },
      { path: 'blog', component: BlogComponent, canActivate: [AuthenticationService] },
      { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthenticationService] },
      { path: 'mycourse', component: MycourseComponent, canActivate: [AuthenticationService] },
      { path: 'order-history', component: CoursehistoryComponent, canActivate: [AuthenticationService] },
      { path: 'admin-courses', component: AdminCoursesComponent, canActivate: [AuthenticationService] }
    ]
  },
  { path: 'search-result', redirectTo : 'search-result/course'},
  { path: 'search-result', component: SearchResultComponent, 
    children: [
      { path: 'course', component: SearchCourseComponent },
      { path: 'blog', component: SearchBlogComponent }
    ] },
  { path : '**' , redirectTo : '' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
