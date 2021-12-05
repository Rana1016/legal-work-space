import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import SideNavItems from './sidenav.routes';

@Component({
  selector: 'lw-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor(private route: Router, private modalService: NgbModal) {}
  @Input() openSideNav?: boolean;
  @Output() closed = new EventEmitter<boolean>(false);
  @ViewChild('MobileMainMenu') MobileMainMenu!: TemplateRef<any>;

  menuItems!: any[];
  ngOnInit(): void {
    this.menuItems = SideNavItems
  }

  ngOnChanges(changes: SimpleChanges) {
    changes['openSideNav'].currentValue && this.openModal();
  }

  openModal() {
    const Modal = this.modalService.open(this.MobileMainMenu, {
      windowClass: 'modal-left mobi-menu modal left fade',
    });
    Modal.result.finally(() => this.closed.emit(true))
  }

  checkActive(url: string) {
    return this.route.url.replace('/', '').includes(url)
  }
}
