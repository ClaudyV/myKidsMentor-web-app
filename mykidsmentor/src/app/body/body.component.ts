import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  user: firebase.User;

  constructor(private loginfo: AuthenticationService) { }

  ngOnInit(): void {
    this.loginfo.getCurrentUser()
        .subscribe(user => this.user = user);
  }

}
