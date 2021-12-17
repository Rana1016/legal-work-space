import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
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
        emptyTable: 'No documents available.'
      },
      columns: [{
        title: 'Last modified',
        width: '150',
        orderable: true
      }, {
        title: 'Type',
        width: '150',
        orderable: false,
        
      }, {
        title: 'Title',
        width: '550',
        orderable: false
      }, {
        title: 'Size',
        width: '100',
        orderable: false
      }, {
        title: 'Author',
        width: '100',
        orderable: false
      }, {
        title: 'File sharing',
        width: '150',
        orderable: false
      }, {
        title: 'Actions',
        width: '100',
        orderable: false
      }]
    };
  }

}
