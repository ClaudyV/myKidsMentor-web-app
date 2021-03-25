import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from 'src/app/service/users.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
export interface MessagesIndex {
  [index: string]: string;
}

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  error: any;
  user: firebase.User;
  success: string;
  isLoading: boolean;
  frmSetNewPassword = this.fb.group({
    oldPassword: [null, [Validators.required]],
    newPassword: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
  });
  params = {
    'requires-recent-login': '如果要修改密碼，請重新登入一次。',
    'wrong-password': '舊密碼錯了！ 請再輸入一次'

} as MessagesIndex;

  constructor(private loginfo: AuthenticationService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginfo.getCurrentUser()
    .subscribe(user => {
      if (user && user.emailVerified){
        this.user = user;
      }
       });
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
