import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { settings } from '../types/settings.routes';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('MobileSettingsMenu') MobileSettingsMenu!: TemplateRef<any>;
  @ViewChild('MobileNotificationsMenu') MobileNotificationsMenu!: TemplateRef<any>;
  @ViewChild('MobileCalculatorsMenu') MobileCalculatorsMenu!: TemplateRef<any>;
  @ViewChild('VATCalculator') VATCalculator!: TemplateRef<any>;
  @ViewChild('TimeToUnitCalculator') TimeToUnitCalculator!: TemplateRef<any>;
  @ViewChild('UnitToTimeCalculator') UnitToTimeCalculator!: TemplateRef<any>;
  @ViewChild('AmountToTimeCalculator') AmountToTimeCalculator!: TemplateRef<any>;
  @ViewChild('AddTimeEntryForBilling') AddTimeEntryForBilling!: TemplateRef<any>;

  constructor(private modalService: NgbModal) { }
  ngOnInit(): void {
  }

  Settings = settings;
  mobileMenu: boolean = false;

  openModal(modal: string) {
    modal !== 'MobileMainMenu' ? this.modalService.open((<any>this)[modal], <NgbModalOptions>(<any>this.defaultOptions)[modal] || undefined)
    : this.mobileMenu = true
  }

  defaultOptions = {
    MobileSettingsMenu: {
      windowClass: 'modal-left mobi-menu1 modal left fade'
    },
    MobileNotificationsMenu: {
      windowClass: 'modal-left mobi-menu2 modal left fade'
    },
    MobileCalculatorsMenu: {
      windowClass: 'modal-left mobi-menu2 modal left fade'
    }
  }
}