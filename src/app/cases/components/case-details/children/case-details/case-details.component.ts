import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/cases.service';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {

  constructor(private router: Router, private caseService: CasesService) { }
  caseId!: number;
  caseDetails: any;

  ngOnInit(): void {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
    this.caseService.getCaseDetails(this.caseId).subscribe((caseDetails) => this.caseDetails = caseDetails)
  }

}
