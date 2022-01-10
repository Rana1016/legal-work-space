import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeshiService } from 'src/app/shared/services/peshi.service';

@Component({
  selector: 'app-peshi-list',
  templateUrl: './peshi-list.component.html',
  styleUrls: ['./peshi-list.component.scss']
})
export class PeshiListComponent implements OnInit {
  constructor(private router: Router, private peshi: PeshiService) { }
  peshis!: any[];
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
        processing: 'Loading Peshis...',
        emptyTable: 'No Peshis available.'
      },
      columns: [{
        title: '#',
        width: '40',
        data: 'peshiId',
        orderable: true
      }, {
        title: 'Previous Proceedings',
        width: '350',
        data: 'previousProceedings',
        orderable: false,

      }, {
        title: 'Previous Date',
        width: '150',
        data: 'previousDate',
        orderable: false
      }, {
        title: 'Next Date',
        width: '200',
        data: 'uploadedDate',
        orderable: false
      }, {
        title: 'Remarks',
        width: '250',
        data: 'remarks',
        orderable: false
      }, {
        title: 'Actions',
        width: '150',
        data: null,
        orderable: false,
      }],
      ajax: this.ajaxPeshis.bind(this)
    };
  }
  ajaxPeshis(dTParams: any, callback: any) {
    this.peshi.getPeshisByCaseId(this.caseId, dTParams).subscribe(({ totalRecords, records }) => {
      this.peshis = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    })
  }

  deletePeshi(peshiId: number) {
    this.peshi.deletePeshi(peshiId).subscribe((res) => { if (res == 1) { this.peshis = this.peshis.filter((peshi) => peshi.peshiId != peshiId) } });
  }

}
