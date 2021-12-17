import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peshi-list',
  templateUrl: './peshi-list.component.html',
  styleUrls: ['./peshi-list.component.scss']
})
export class PeshiListComponent implements OnInit {
  constructor() { }

  data: any;
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: false,
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      language: {
        emptyTable: 'No peshis available.'
      },
      columns: [{
        title: 'File Ref.',
        data: 'fileRef',
        width: '100',
        orderable: true
      }, {
        title: 'Court Case No.',
        data: 'courtCaseNumber',
        width: '150',
        orderable: false,
        
      }, {
        title: 'Remarks',
        data: 'remarks',
        width: '550',
        orderable: false
      }, {
        title: 'Previous Date',
        data: 'prevDate',
        width: '100',
        orderable: false
      }, {
        title: 'Next Date',
        data: 'nextDate',
        width: '100',
        orderable: false
      }, {
        title: 'Actions',
        width: '100',
        orderable: false
      }]
    };
  }

}
