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
  Cases: any;
  dtOptions!: DataTables.Settings;
  totalCases!: number;
  constructor(private caseService: CasesService) { }
  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: true,
      processing: true,
      ordering: true,
      info: true,
      autoWidth: false,
      searching: true,
      serverSide: true,
      pagingType: 'full_numbers',
      language: {
        emptyTable: 'No cases available.',
        processing: 'Loading Cases...'
      },
      columns: [{
        title: 'Date',
        data: 'date',
        width: '200',
        orderable: true
      }, {
        title: 'Case Ref',
        data: 'caseRef',
        width: '150',
        orderable: false,

      }, {
        title: 'Client Name',
        data: 'clientName',
        width: '250',
        orderable: false
      }, {
        title: 'Matter Description',
        data: 'matterDescription',
        width: '550',
        orderable: false
      }],
      ajax: this.ajaxCases.bind(this)
    };
  }
  checkCase(caseId: string | number) {
    if ((<string>caseId).length >= 4) {
      caseId = Number(caseId)
      this.caseService.isValid(caseId).subscribe(({ message, clientName }: any) => {
        this.clientName = clientName;
        this.isValid = message == undefined
      })
    } else {
      this.isValid = true;
      this.clientName = "";
    }
  }

  ajaxCases(dTParams: any, callback: any) {
    this.caseService.getCases(dTParams).subscribe(({ records, totalRecords }: any) => {
      this.Cases = records;
      this.totalCases = totalRecords;
      callback({
        recordsFiltered: totalRecords,
        recordsTotal: totalRecords
      })
    })
  }
}
