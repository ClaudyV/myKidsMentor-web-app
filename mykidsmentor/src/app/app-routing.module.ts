import { UsersComponent } from './users/users.component';
import { AdminService } from './service/admin.service';
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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'course', component: CourseComponent, canActivate: [AuthenticationService] },
  { path: 'user', redirectTo : 'user/account-info'},
  { path: 'user', component: UsersComponent, canActivate: [AuthenticationService],
    children: [
      { path: 'account-info', component: AccountinfoComponent, canActivate: [AuthenticationService] },
      { path: 'blog', component: BlogComponent, canActivate: [AuthenticationService] },
      { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthenticationService] },
      { path: 'mycourse', component: MycourseComponent, canActivate: [AuthenticationService] },
      { path: 'order-history', component: CoursehistoryComponent, canActivate: [AuthenticationService] }
    ]
  },
  { path : '**' , redirectTo : '' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
