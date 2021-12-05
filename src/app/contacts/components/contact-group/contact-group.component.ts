import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-group',
  templateUrl: './contact-group.component.html',
  styleUrls: ['./contact-group.component.scss']
})
export class ContactGroupComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
    const urlParts = this.router.url.split('/');
    this.title = urlParts[urlParts.length - 1].split('-').join(' ');
  }

  title!: string;

}
