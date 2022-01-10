import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { StatusService } from 'src/app/shared/services/case-details/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  constructor(private router: Router, private statusService: StatusService) { }
  caseId!: number;
  caseStatus!: string;
  currentDate = moment(new Date()).format('DD-MM-yyyy')
  ngOnInit(): void {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
    this.getStatus();
  }

  changeStatus(status: string) {
    this.statusService.changeCaseStatus(this.caseId, status).subscribe((data) => {
      if (data == true) {
        this.caseStatus = <string>status
      }
    })
  }

  getStatus() {
    this.statusService.statusObservable.subscribe((status) => {
      this.caseStatus = status;
    });
  }

}
