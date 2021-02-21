import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../service/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as firebase from 'firebase/app';
import 'firebase/auth';
export interface MessagesIndex {
  [index: string]: string;
}

export interface PeriodicElement {
  amount: number;
  courseBought: string;
  paymentMethod: string;
  orderedTime: string;
  orderStatus: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {courseBought: '第一堂課', amount: 300, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第二堂課', amount: 400, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第三堂課', amount: 150, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第四堂課', amount: 200, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第五堂課', amount: 350, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第六堂課', amount: 250, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第七堂課', amount: 180, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第八堂課', amount: 170, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第久堂課', amount: 280, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第十堂課', amount: 340, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
];

/**
 * @title Basic use of `<mat-table>` (uses display flex)
 */


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  user: firebase.User;
  sideBarItem = ['訂單紀錄', '課程總覽', '收藏文章','修改密碼'];
  selectedItem: any;
  changePassword: boolean = false;
  orderRecord: boolean = true;
  courseOverview: boolean = false;
  favoriteArticles: boolean = false;

  frmSetNewPassword = this.fb.group({
    oldPassword: [null, [Validators.required]],
    newPassword: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
  });
  error: any;
  props: any;
  params = {
    'requires-recent-login': '如果要修改密碼，請重新登入一次。',
    'wrong-password': '舊密碼錯了！ 請再輸入一次'

} as MessagesIndex;
  success: string;
  isLoading: boolean;
  displayedColumns: string[] = ['courseBought', 'amount', 'paymentMethod', 'orderedTime', 'orderStatus'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private title: Title, 
              private meta: Meta, 
              public auth: AngularFireAuth,
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
    this.selectedItem = '訂單紀錄';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

    if (item === '訂單紀錄') {
      this.changePassword = false;
      this.orderRecord = true;
      this.courseOverview = false;
      this.favoriteArticles = false;
    } else if (item === '課程總覽') {
      this.changePassword = false;
      this.orderRecord = false;
      this.courseOverview = true;
      this.favoriteArticles = false;
    } else if (item === '收藏文章') {
      this.changePassword = false;
      this.orderRecord = false;
      this.courseOverview = false;
      this.favoriteArticles = true;
    } else if (item === '修改密碼') {
      this.changePassword = true;
      this.orderRecord = false;
      this.courseOverview = false;
      this.favoriteArticles = false;
    }

  }

  reauthenticate(currentPassword) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.user.email, currentPassword);
    return this.user.reauthenticateWithCredential(credential);
  }

  async setPassword() {
    const oldPassword = this.frmSetNewPassword.controls['oldPassword'].value;
    let form = document.getElementById('passwordForm');
    await this.reauthenticate(oldPassword).then(() => {

      const newPassword = this.frmSetNewPassword.controls['newPassword'].value;
      const confirmPassword = this.frmSetNewPassword.controls['confirmPassword'].value;

      if (oldPassword === newPassword) {
        this.success = '';
        this.error = '舊密碼不能跟新密碼相同，請重新輸入一次。';
        if(form) {
          (form as HTMLFormElement).reset();
        }
        return;
      } 

      if (newPassword !== confirmPassword) {
        this.error = '新密碼前後輸入不同，請輸入相同的新密碼。';
        if(form) {
          (form as HTMLFormElement).reset();
        }
        return;
      } else {
          this.isLoading = true;
          this.user.updatePassword(newPassword).then(() => {
          this.isLoading = false;
          this.error = '';
          this.success = '密碼修改完成';
        }).catch((error) => {
          this.isLoading = false;
          this.success = '';
          let code = error.code.split('/')[1];
          if (this.params[code]) {
            this.error = this.params[code];
          }
        });
      }

    }).catch((error) => {
      let code = error.code.split('/')[1];
      if (this.params[code]) {
        this.error = this.params[code];
      }
      this.isLoading = false;
    });

    
    if(form) {
      (form as HTMLFormElement).reset();
    }
  }

}
