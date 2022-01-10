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
  keyDates!: any[];
  dtOptions!: DataTables.Settings;
  caseId!: number;

  ngOnInit(): void {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
    this.dtOptions = {
      responsive: true,
      serverSide: true,
      // scrollX: true,
      order: [[0, "desc"]],
      paging: true,
      processing: true,
      pageLength: 10,
      pagingType: 'full_numbers',
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      lengthChange: false,
      language: {
        processing: 'Loading Key Dates...',
        emptyTable: 'No Key Dates available.'
      },
      columns: [{
        title: '',
        width: '40',
        data: null,
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
    this.keydateService.getKeyDatesByCaseId(this.caseId, dTParams).subscribe(({totalRecords, records}) => {
      this.keyDates = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords
      })
    })
  }

  deleteKeyDate(keyDateId: number) {
    this.keydateService.delete(keyDateId).subscribe((res) => { if (res == 1) { this.keyDates = this.keyDates.filter((keyDate) => keyDate.keyDateId != keyDateId) } });
  }
}
