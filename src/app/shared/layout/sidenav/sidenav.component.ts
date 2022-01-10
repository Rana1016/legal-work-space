import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Router, } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'lw-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnChanges {
  constructor(private route: Router, private modalService: NgbModal, private clientSvc: ClientService) {}
  @Input() openSideNav?: boolean;
  @Input() isClient?: boolean;
  @Input() clientMenu?: any[];
  @Output() closed = new EventEmitter<boolean>(false);
  @ViewChild('MobileMainMenu') MobileMainMenu!: TemplateRef<any>;

  @Input() menuItems!: any[];
  client?: string;
  ngOnInit(): void {
    this.clientSvc.clientObservable.subscribe((client) => this.client = client);
  }

  ngOnChanges(changes: SimpleChanges) {
    changes['openSideNav']?.currentValue && this.openModal();
  }

  openModal() {
    const Modal = this.modalService.open(this.MobileMainMenu, {
      windowClass: 'modal-left mobi-menu modal left fade',
    });
    Modal.result.finally(() => this.closed.emit(true))
  }

  checkActive(url: string) {
      return this.route.url.split('/').slice(1).join('/').startsWith(url)
  }
}
