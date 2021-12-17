import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService } from '../shared/services/cases.service';

@Component({
  selector: 'app-keydates',
  templateUrl: './keydates.component.html',
  styleUrls: ['./keydates.component.scss']
})
export class KeydatesComponent implements OnInit {
  constructor(private router: Router, private caseService: CasesService) { }
  
  data: any;
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      serverSide: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: true,
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      language: {
        emptyTable: 'No keydates available.'
      },
      columns: [{
        title: '',
        width: '150',
        orderable: false
      }, {
        title: 'Key date',
        width: '150',
        data: 'keyDate',
        orderable: true,
        
      }, {
        title: 'Title',
        width: '350',
        data: 'title',
        orderable: false
      }, {
        title: 'Reminder date',
        width: '150',
        data: null,
        orderable: true
      }, {
        title: 'Actions',
        width: '100',
        data: null,
        orderable: false
      }],
      ajax: this.ajaxKeyDates.bind(this)
    };
  }
  ajaxKeyDates(dTParams: any, callback: any) {
    this.caseService.getKeyDates(dTParams).subscribe((data) => {
      callback({
        recordsTotal: data.length,
        recordsFiltered: data.length,
        data: data
      })
    })
  }
}
