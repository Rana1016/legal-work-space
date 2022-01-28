import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmlService } from 'src/app/shared/services/case-details/aml.service';
import { NotesService } from 'src/app/shared/services/case-details/notes.service';
import { StatusService } from 'src/app/shared/services/case-details/status.service';
import { CasesService } from 'src/app/shared/services/cases.service';
import { KeydatesService } from 'src/app/shared/services/keydates.service';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
})
export class CaseDetailsComponent implements OnInit {
  constructor(private router: Router, private caseService: CasesService, private amlService: AmlService, private noteService: NotesService, private statusService: StatusService) {}
  caseRef!: number;
  categoryCode!: string;
  pD!: any;
  cD!: any;
  detailsTabs!: any[];
  ngOnInit(): void {
    // this.caseService.getCase(this.caseRef).subscribe((currentCase) => this.currentCase = currentCase);
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
    this.caseRef = Number(UrlPartitions[UrlPartitions.length - 2]);
    this.caseService.getPersonalDetails(this.caseRef).subscribe(personalDetails => this.pD = personalDetails);
    this.caseService.getCaseDetails(this.caseRef).subscribe(caseDetails => this.cD = caseDetails );
    this.statusService.caseStatus(this.caseRef).subscribe();
  };


  activatePanel(myDT?: any) {
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
