import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TimeKeepingService } from 'src/app/shared/services/time-keeping.service';

@Component({
  selector: 'app-time-keeping',
  templateUrl: './time-keeping.component.html',
  styleUrls: ['./time-keeping.component.scss']
})
export class TimeKeepingComponent implements OnInit {
  constructor(private timeKeep: TimeKeepingService, private lookup: SharedService, private router: Router) {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
  }
  caseId: number;
  timeKeepings!: any[];
  dtOptions: any;
  categories!: any[];
  subCategories!: any[];

  ngOnInit(): void {
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
        processing: 'Loading Time Keepings...',
        emptyTable: 'No Time Keepings available.'
      },
      columns: [{
        title: 'Time Keep ID',
        data: 'timeKeepId',
        orderable: true
      },
      // {
      //   title: 'Case ID',
      //   data: 'caseId',
      //   orderable: false,

      // },
      {
        title: 'Date Added',
        data: 'dateCreated',
        orderable: false
      }, {
        title: 'Category',
        data: 'categoryId',
        orderable: false
      }, {
        title: 'Subcategory',
        orderable: false,
        data: 'subCategoryId'
      }, {
        title: 'Inclusive of VAT',
        orderable: false,
        data: 'jobType'
      }, {
        title: 'VAT Rate',
        orderable: false,
        data: 'vatRate'
      }, {
        title: 'Time Spent',
        orderable: false,
        data: 'timeSpent'
      }, {
        title: 'Type',
        orderable: false,
        data: 'type'
      }, {
        title: 'Actions',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxTimeKeepings.bind(this)
    };
  }

  ajaxTimeKeepings(dTParams: any, callback: any) {
    this.timeKeep.getByCaseId(this.caseId, dTParams).subscribe(({ records, totalRecords }) => {
      this.timeKeepings = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    })
  }

  deleteTimeKeeping(timeKeepingId: number) {
    this.timeKeep.deleteTimeKeep(timeKeepingId).subscribe((res) => { if (res == 1) { this.timeKeepings = this.timeKeepings.filter((timeKeeping) => timeKeeping.timeKeepId != timeKeepingId) } });
  }

  getCategory(id: number) {
    return this.lookup.getOptions('tblHourlyRate', 'hourlyRateId', 'Title', 'hourlyRateId', id);
  }

  getSubCategory(id: number) {
    return this.lookup.getOptions('tblHourlyRateDetail', 'hourlyRateDetailId', 'Title', 'hourlyRateDetailId', id);
  }

  openEdit(id: number) {
    this.timeKeep.openModal(id);
  }

}
