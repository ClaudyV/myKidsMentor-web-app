import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: firebase.User;

  constructor(private title: Title, private meta: Meta, private loginfo: AuthenticationService) { }

  ngOnInit(): void {

    this.loginfo.getCurrentUser()
    .subscribe(user => {
      if (user && user.emailVerified){
        this.user = user;
      }
       });

    this.metaTags();
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

}
