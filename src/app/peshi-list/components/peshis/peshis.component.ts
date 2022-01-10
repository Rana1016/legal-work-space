import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, Column, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { CasesService } from 'src/app/shared/services/cases.service';
import { PeshiService } from 'src/app/shared/services/peshi.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-peshis',
  templateUrl: './peshis.component.html',
  styleUrls: ['./peshis.component.scss'],
})
export class PeshisComponent implements OnInit {
  gridApi?: GridApi;
  gridColumnApi?: ColumnApi;
  constructor(private lookup: SharedService, private peshi: PeshiService) {}

  columnDefs: ColDef[] = [
    {
      field: 'caseId',
      editable: true,
    },
    {
      field: 'previousProceedings',
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
    this.peshi.getAll().subscribe((rowData) => this.rowData = rowData)
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

  editPeshi(row: any) {
    this.lookup.updateOption('tblPeshi',  'peshiId', row.colDef.field, `${row.data.peshiId}`, row.newValue).subscribe();
  }
}
