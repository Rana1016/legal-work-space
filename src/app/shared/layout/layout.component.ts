import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { SharedService } from '../services/shared.service';
import { SideNavItems } from './sidenav/sidenav.routes';

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
  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private sharedService: SharedService) { }
  get isLoading() { return (<any>window).pageLoading };
  installments?: number;
  workflow?: number;
  reminders?: number;
  clientMenu = SideNavItems;
  get isClient() { return this.router.url.includes('/client/') };
  ngOnInit(): void {
    console.log("layout");
    
    this.sharedService.getMenu().subscribe(({ leftMenu, settingsMenu }) => {
      this.LeftMenu = leftMenu;
      this.Settings = settingsMenu;
    });
    (<any>window).pageLoading = false;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(({ url }: any) => {
      url != '/calendar' && ((<any>window).pageLoading = true,
        setTimeout(() => {
          (<any>window).pageLoading = false;
        }, 1500));
    });
    this.sharedService.getNotificationsCount().subscribe(({ installmentCount, reminderCount }: { installmentCount: number, reminderCount: number }) => {
      this.installments = installmentCount;
      this.reminders = reminderCount;
    });
  }
  LeftMenu!: any[];
  Settings!: any[];
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