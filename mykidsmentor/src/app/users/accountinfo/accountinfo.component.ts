import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EverificationComponent } from 'src/app/everification/everification.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-accountinfo',
  templateUrl: './accountinfo.component.html',
  styleUrls: ['./accountinfo.component.css']
})
export class AccountinfoComponent implements OnInit {

  user: firebase.User;
  isChanging: boolean = false;
  checkedBlue;
  checkedPink;
  srcImage: string;
  isChangingName:boolean = false;
  frmSetNewName = this.fb.group({
    newName: [null, [Validators.required]],
  });

  constructor(private loginfo: AuthenticationService,
              public dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginfo.getCurrentUser()
    .subscribe(user => {
      if (user && user.emailVerified){
        this.user = user;
      }
       });
  }

  changePicture(event) {
    this.isChanging = true;
  }

  savePicture(event) {
    if(this.checkedPink && this.checkedBlue) {
      this.dialog.open(EverificationComponent, {
        panelClass : 'verifyClass',
        data: 
        {
          warning: "請您大狗勾一個"
        }
      }).afterClosed().subscribe(
        result => {
          this.isChanging = false;
          this.checkedBlue = false;
          this.checkedPink = false;
        }
      );
    } else if(!this.checkedPink && !this.checkedBlue) {
      this.dialog.open(EverificationComponent, {
        panelClass : 'verifyClass',
        data: 
        {
          warning: "請您大狗勾一個"
        }
      }).afterClosed().subscribe(
        result => {
          this.isChanging = false;
        }
      );
    } else {
      if(this.checkedPink) {
        this.user.updateProfile({
          displayName : this.user.displayName,
          photoURL : "https://firebasestorage.googleapis.com/v0/b/my-kid-s-mentor.appspot.com/o/mkm-ico.png?alt=media&token=fe856dff-ce98-4e31-b9f9-6bea2a8904a4"
        }).then(() => {
          this.dialog.open(EverificationComponent, {
            panelClass : 'verifyClass',
            data: 
            {
              warning: "照片改善成功"
            }
          }).afterClosed().subscribe(
            result => {
              this.isChanging = false;
            }
          );
        }).catch((error) => {
          alert(error);
        });
      } else if(this.checkedBlue) {
        this.user.updateProfile({
          displayName : this.user.displayName,
          photoURL : "https://firebasestorage.googleapis.com/v0/b/my-kid-s-mentor.appspot.com/o/mkm-ico-blue.png?alt=media&token=c3d68590-07d2-43e9-aadc-cd0bca62e07a"
        }).then(() => {
          this.dialog.open(EverificationComponent, {
            panelClass : 'verifyClass',
            data: 
            {
              warning: "照片改善成功"
            }
          }).afterClosed().subscribe(
            result => {
              this.isChanging = false;
            }
          );
        }).catch((error) => {
          alert(error);
        });
      }
    }
  }

  cancelPicture(event) {
    this.isChanging = false;
    this.checkedBlue = false;
    this.checkedPink = false;
  }

  changeName(event) {
    this.isChangingName = true;
  }

  cancelNameChange(event) {
    this.isChangingName = false;
  }

  async onSubmitName() {
    const newName = this.frmSetNewName.controls['newName'].value;
    console.log(newName);
    this.user.updateProfile({
      displayName: newName,
      photoURL: this.user.photoURL
    }).then(() => {
      this.dialog.open(EverificationComponent, {
        panelClass : 'verifyClass',
        data: 
        {
          warning: "新名字改善成功"
        }
      }).afterClosed().subscribe(
        result => {
          this.isChangingName = false;
        }
      );
    }).catch((error) => {
      alert(error);
    });
  }

}
