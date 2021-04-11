import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components generated
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';

// imported modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {AngularFireModule} from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { SignupComponent } from './signup/signup.component';
import {LayoutModule} from '@angular/cdk/layout';
import { PwnotificationComponent } from './pwnotification/pwnotification.component';
import { EverificationComponent } from './everification/everification.component';
import { UsersComponent } from './users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MycourseComponent } from './users/mycourse/mycourse.component';
import { BlogComponent } from './users/blog/blog.component';
import { ChangepasswordComponent } from './users/changepassword/changepassword.component';
import { AccountinfoComponent } from './users/accountinfo/accountinfo.component';
import { CoursehistoryComponent } from './users/coursehistory/coursehistory.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    LoginComponent,
    HomeComponent,
    CourseComponent,
    SignupComponent,
    PwnotificationComponent,
    EverificationComponent,
    UsersComponent,
    FooterComponent,
    MycourseComponent,
    BlogComponent,
    ChangepasswordComponent,
    AccountinfoComponent,
    CoursehistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    ScrollingModule,
    NgbModule
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent,
    PwnotificationComponent,
    EverificationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
