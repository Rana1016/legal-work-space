import { Component, OnInit } from '@angular/core';
import { CasesService } from '../shared/services/cases.service';

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.scss']
})
export class NewCaseComponent implements OnInit {
  searchId = '';
  isValid?: boolean = true;
  clientName?: string = "";
  constructor(private caseService: CasesService) { }
  ngOnInit(): void {}
  checkCase(caseId: string | number) {
    if ((<string>caseId).length >= 4) {
      caseId = Number(caseId)
      this.caseService.isValid(caseId).subscribe(({message, clientName}: any) => {
        this.clientName = clientName;
        this.isValid = message == undefined
      })
    } else {
      this.isValid = true;
      this.clientName = "";
    }
  }
}
