import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'lw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  @Input() Settings!: any[];
  @Output() openModal = new EventEmitter<string>();
  @Input() installments?: number;
  @Input() workflow?: number;
  @Input() reminders?: number;
  @Input() isClient?: boolean;
  isInClient: boolean = false;
  userName: any;
  constructor(private user: UserService, private sharedService: SharedService, private router : Router) {
    console.log(this.router.url);
    if(this.router.url.includes('client')){
      this.isInClient = true;
      this.userName = (<any>this.user.getClient).userName;
    }else{
      this.isInClient = false;
      this.userName = (<any>this.user.getUser).name;
    }
    
  }
  
  open(modal: string) {
    this.openModal.emit(modal);
  };

  updateNotification(notificationType: string) {
    this.sharedService.updateNotification(notificationType).subscribe((res) => res == 1 && ((<any>this)[notificationType] = 0))
  };

  logout() {
    this.user.logout();
  }
  clientLogout() {
    this.userName = (<any>this.user.getUser).name;
    this.user.customerLogout();
  }
}