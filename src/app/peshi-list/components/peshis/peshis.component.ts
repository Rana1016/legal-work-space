import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, Column, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { CasesService } from 'src/app/shared/services/cases.service';

@Component({
  selector: 'app-peshis',
  templateUrl: './peshis.component.html',
  styleUrls: ['./peshis.component.scss'],
})
export class PeshisComponent implements OnInit {
  gridApi?: GridApi;
  gridColumnApi?: ColumnApi;
  constructor(private caseService: CasesService) {}

  columnDefs: ColDef[] = [
    {
      field: 'fileRef',
      editable: true,
    },
    {
      field: 'courtCaseNo',
      editable: true
    },
    {
      field: 'remarks',
      editable: true
    },
    {
      field: 'prevDate',
      editable: true
    },
    {
      field: 'nextDate',
      editable: true
    },
  ];
  rowData?: any[];

  ngOnInit(): void {
    setTimeout(() => {
      this.rowData = [
        {
          fileRef: 12,
          courtCaseNo: 1000,
          remarks: 'Admitted Crime',
          prevDate: moment(new Date()).format('DD-MM-yyyy'),
          nextDate: moment(new Date()).format('DD-MM-yyyy')
        },
        {
          fileRef: 12,
          courtCaseNo: 1000,
          remarks: 'Admitted Crime',
          prevDate: moment(new Date()).format('DD-MM-yyyy'),
          nextDate: moment(new Date()).format('DD-MM-yyyy')
        },
        {
          fileRef: 12,
          courtCaseNo: 1000,
          remarks: 'Admitted Crime',
          prevDate: moment(new Date()).format('DD-MM-yyyy'),
          nextDate: moment(new Date()).format('DD-MM-yyyy')
        },
        {
          fileRef: 12,
          courtCaseNo: 1000,
          remarks: 'Admitted Crime',
          prevDate: moment(new Date()).format('DD-MM-yyyy'),
          nextDate: moment(new Date()).format('DD-MM-yyyy')
        },
        {
          fileRef: 12,
          courtCaseNo: 1000,
          remarks: 'Admitted Crime',
          prevDate: moment(new Date()).format('DD-MM-yyyy'),
          nextDate: moment(new Date()).format('DD-MM-yyyy')
        }
      ];
    }, 1500)
  };

  sizeToFit() {
    this.gridApi?.sizeColumnsToFit();
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds:string[] = [];
    (<Column[]>this.gridColumnApi?.getAllColumns()).forEach((column) => {
      allColumnIds.push(column.getColId());
    });
    this.gridColumnApi?.autoSizeColumns(allColumnIds, skipHeader);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sizeToFit();
  }
}
