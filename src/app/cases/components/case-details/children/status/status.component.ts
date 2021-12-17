import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CaseDetailService } from 'src/app/shared/services/case-detail.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  constructor(private router: Router, private caseDetailService: CaseDetailService) { }
  caseId!: number;
  caseStatus!: string;
  currentDate = moment(new Date()).format('DD-MM-yyyy')
  ngOnInit(): void {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
    this.getStatus();
  }

  changeStatus(status: string) {
    this.caseDetailService.changeCaseStatus(this.caseId, status).subscribe((data) => {
      if (data == true) {
        this.caseStatus = <string>status
      }
    })
  }

  getStatus() {
    this.caseDetailService.caseStatus(this.caseId).subscribe((status) => {
      console.log(status)
      this.caseStatus = status;
    })
  }

}
