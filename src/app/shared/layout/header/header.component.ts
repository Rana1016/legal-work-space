import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { settings } from '../../types/settings.routes';

@Component({
  selector: 'lw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  Settings = settings;
  @Output() openModal = new EventEmitter<string>();

  constructor(private modalService: NgbModal) { }
  open(modal: string) {
    this.openModal.emit(modal);
  }
}