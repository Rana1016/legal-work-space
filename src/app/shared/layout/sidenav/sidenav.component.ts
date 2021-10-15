import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import SideNavItems from './sidenav.routes';

@Component({
  selector: 'lw-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private route: Router) {}

  menuItems!: any[];
  ngOnInit(): void {
    this.menuItems = SideNavItems
  }

  checkActive(url: string) {
    return this.route.url.replace('/', '').includes(url)
  }
}
