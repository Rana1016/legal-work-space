import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeydatesService } from 'src/app/shared/services/keydates.service';

@Component({
  selector: 'app-dead-lines',
  templateUrl: './dead-lines.component.html',
  styleUrls: ['./dead-lines.component.scss']
})
export class DeadLinesComponent implements OnInit {
  constructor(private router: Router, private keydateService: KeydatesService) { }
  
  data: any;
  dtOptions!: DataTables.Settings;
  caseId!: number;

  ngOnInit(): void {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
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
    this.keydateService.getKeyDatesByCaseId(this.caseId).subscribe((data) => {
      callback({
        recordsTotal: data.length,
        recordsFiltered: data.length,
        data: data
      })
    })
  }
}
