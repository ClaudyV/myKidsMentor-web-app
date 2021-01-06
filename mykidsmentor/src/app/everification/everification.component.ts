import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from './../service/authentication.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-everification',
  templateUrl: './everification.component.html',
  styleUrls: ['./everification.component.css']
})
export class EverificationComponent implements OnInit {

  getUserEmail;

  constructor(public PwNotificationDialogRef: MatDialogRef<EverificationComponent>,
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
