import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss']
})
export class NewActivityComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
    const urlParts = this.router.url.split('/');
    this.title = decodeURI(urlParts[urlParts.length - 2].split('-').join(' '))
    ;
  }

  title!: string;

}
