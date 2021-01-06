import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from './../service/authentication.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-pwnotification',
  templateUrl: './pwnotification.component.html',
  styleUrls: ['./pwnotification.component.css']
})
export class PwnotificationComponent implements OnInit {
  getUserEmail: any;

  constructor(public PwNotificationDialogRef: MatDialogRef<PwnotificationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public auth: AngularFireAuth,
              private login: AuthenticationService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserEmail = this.data.userEmail;
    console.log(this.getUserEmail);
  }



}
