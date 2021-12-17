import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CasesService } from 'src/app/shared/services/cases.service';

@Component({
  selector: 'app-peshis',
  templateUrl: './peshis.component.html',
  styleUrls: ['./peshis.component.scss'],
})
export class PeshisComponent implements OnInit {
  constructor(private caseService: CasesService) {}

  columnDefs: ColDef[] = [
    {
      field: 'fileRef',
    },
    {
      field: 'courtCaseNumber',
    },
    {
      field: 'remarks',
    },
    {
      field: 'prevDate',
    },
    {
      field: 'nextDate',
    },
  ];
  rowData?: Observable<any[]>;

  ngOnInit(): void {
    this.rowData = this.caseService.getKeyDates({})
  }
}
