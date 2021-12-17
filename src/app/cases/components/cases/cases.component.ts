import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CasesService } from 'src/app/shared/services/cases.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private caseService: CasesService) { }
  Cases: any;
  data: any;
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: true,
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

  ajaxCases(dTParams: any, callback: any) {
    this.caseService.getCases(dTParams).subscribe(({cases, totalRecords}: any) => {
      this.Cases = cases
      callback({
        recordsFiltered: totalRecords,
        recordsTotal: totalRecords 
      })
    })
  }
}
