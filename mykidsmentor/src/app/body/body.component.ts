import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, AfterViewInit {

  user: firebase.User;
  isLoaded = false;

  constructor(private loginfo: AuthenticationService) { }

  ngOnInit(): void {
    this.loginfo.getCurrentUser()
        .subscribe(user => this.user = user);
  }

  ngAfterViewInit(){
    // this.isLoaded = true;
    // console.log("YES");
  }

}
