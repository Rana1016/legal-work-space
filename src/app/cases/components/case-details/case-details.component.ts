import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { caseDetail } from 'src/app/shared/types/case-details.types';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
})
export class CaseDetailsComponent implements OnInit {
  constructor(private router: Router) {}
  caseId!: number;

  detailsTabs!: caseDetail[];
  ngOnInit(): void {
    this.detailsTabs = [
      {
        title: 'Personal Details',
        selector: 'personal-details',
      },
      {
        title: 'Case Details',
        selector: 'case-details',
      },
      {
        title: 'Accounts',
        selector: 'account-details',
      },
      {
        title: 'Time Keeping',
        selector: 'time-keeping',
      },
      {
        title: 'Documents',
        selector: 'documents',
      },
      {
        title: 'Peshi List',
        selector: 'peshi-list',
      },
      {
        title: 'Notes',
        selector: 'notes',
      },
      {
        title: 'Key Dates',
        selector: 'deadlines',
      },
      {
        title: 'Workflow',
        selector: 'workflow',
      },
      {
        title: 'AML',
        selector: 'aml',
      },
      {
        title: 'Activities',
        selector: 'activities',
      },
      {
        title: 'Status',
        selector: 'status',
      },
    ];
    this.activatePanel();
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
  };


  activatePanel(myDT?: caseDetail) {
    if (myDT) {
      myDT.active = true;
      this.detailsTabs.filter((dT) => {
        if (dT.selector !== myDT.selector) {
          dT.active = false;
        }
      });
    } else {
      this.detailsTabs.filter((dT) => {
        if (this.router.url.endsWith(dT.selector as string)) {
          dT.active = true;
        }
      });
    }
  }
}
