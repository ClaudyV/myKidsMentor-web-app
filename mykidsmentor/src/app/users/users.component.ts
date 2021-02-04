import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../service/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: firebase.User;
  sideBarItem = ['個人檔案', '訂單紀錄', '課程總覽', '收藏文章'];
  selectedItem: any;
  personalDoc: boolean = true;
  orderRecord: boolean;
  courseOverview: boolean;
  favoriteArticles: boolean;

  frmSetNewPassword = this.fb.group({
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
  });
  error: any;
  props: any;

  constructor(private title: Title, 
              private meta: Meta, 
              private loginfo: AuthenticationService,
              private userManage: UsersService,
              private fb: FormBuilder, 
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {

    this.loginfo.getCurrentUser()
    .subscribe(user => {
      if (user && user.emailVerified){
        this.user = user;
      }
       });

    this.metaTags();
    this.selectedItem = '個人檔案';
  }

   metaTags(){

    this.title.setTitle('Account Info | My kid ' + 's Mentor');
    this.meta.addTags([
    { name: 'og:url', content: '/' },
    { name: 'og:title', content: 'Home | My kid' + 's Mentor' },
    { name: 'og:description', content: 'This is our description' },
    // { name: 'og:image', content: this.data.image }
  ]);

  }

  listClick(event:Event, item) {
    this.selectedItem = item;

    if (item === '個人檔案') {
      this.personalDoc = true;
      this.orderRecord = false;
      this.courseOverview = false;
      this.favoriteArticles = false;
    } else if (item === '訂單紀錄') {
      this.personalDoc = false;
      this.orderRecord = true;
      this.courseOverview = false;
      this.favoriteArticles = false;
    } else if (item === '課程總覽') {
      this.personalDoc = false;
      this.orderRecord = false;
      this.courseOverview = true;
      this.favoriteArticles = false;
    } else if (item === '收藏文章') {
      this.personalDoc = false;
      this.orderRecord = false;
      this.courseOverview = false;
      this.favoriteArticles = true;
    }
  }

  setPassword() {
    const password = this.frmSetNewPassword.controls['password'].value;
    const confirmPassword = this.frmSetNewPassword.controls['confirmPassword'].value;
  
    console.log(password);
    console.log(confirmPassword);
    if (password !== confirmPassword) {
      // react to error
      return;
    } else {
      this.user.updatePassword(password).then(() => {
        console.log("Password Updated");
      }).catch((error) => {
        console.log(error);
      });
    }
  }

}
