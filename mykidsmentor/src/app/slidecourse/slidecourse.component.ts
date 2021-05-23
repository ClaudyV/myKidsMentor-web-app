import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slidecourse',
  templateUrl: './slidecourse.component.html',
  styleUrls: ['./slidecourse.component.css']
})
export class SlidecourseComponent implements OnInit {

  @Input() course:any;
  currentRate = 4;
  constructor() { }

  ngOnInit(): void {
  }

}
