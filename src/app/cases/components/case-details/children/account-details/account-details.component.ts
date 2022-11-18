import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccoutService } from 'src/app/shared/services/case-details/accout.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  caseId!: number;
  accountDetail: any;
  constructor(private AS : AccoutService, private router: Router) { 
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
  }

  ngOnInit(): void {
    this.getAccountDetail();
  }

  getAccountDetail(){
    this.AS.getAccountDetailById(this.caseId).subscribe((res) => {
      this.accountDetail = res;
    })
  }

  checkDateYaer(date : any){
    if(new Date(date).getFullYear() < 2000){
      return false;
    }else{
      return true;
    }
  }
}
