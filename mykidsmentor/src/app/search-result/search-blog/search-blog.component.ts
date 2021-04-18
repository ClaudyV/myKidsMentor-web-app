import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-search-blog',
  templateUrl: './search-blog.component.html',
  styleUrls: ['./search-blog.component.css']
})
export class SearchBlogComponent implements OnInit {

  constructor(private sharedServe: SharedService) {
    this.sharedServe.setQuotesValue(false);
   }

  ngOnInit(): void {
  }

}
