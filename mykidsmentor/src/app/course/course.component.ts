import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.title.setTitle('Course | My kid' + 's Mentor');
    this.meta.addTags([
      { name: 'og:url', content: '/course' },
      { name: 'og:title', content: 'Home | My kid' + 's Mentor' },
      { name: 'og:description', content: 'This is our description' },
      // { name: 'og:image', content: this.data.image }
    ]);
  }

}
