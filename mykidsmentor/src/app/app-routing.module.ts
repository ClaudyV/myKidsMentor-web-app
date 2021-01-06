import { UsersComponent } from './users/users.component';
import { AdminService } from './service/admin.service';
import { AuthenticationService } from './service/authentication.service';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'course', component: CourseComponent, canActivate: [AuthenticationService] },
  { path: 'account-info', component: UsersComponent, canActivate: [AuthenticationService] },
  { path : '**' , redirectTo : '' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
