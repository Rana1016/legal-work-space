import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
    const urlParts = this.router.url.split('/');
    this.title = decodeURI(urlParts[urlParts.length - 1].split('-').join(' '));
  }

  title!: string;

}
