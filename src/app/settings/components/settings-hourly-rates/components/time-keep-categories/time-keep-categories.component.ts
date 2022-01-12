import { Component, OnInit } from '@angular/core';
import { TimeKeepCategoriesService } from 'src/app/shared/services/time-keep-categories.service';

@Component({
  selector: 'app-time-keep-categories',
  templateUrl: './time-keep-categories.component.html',
  styleUrls: ['./time-keep-categories.component.scss']
})
export class TimeKeepCategoriesComponent implements OnInit {
  constructor(private timeKeepCategory: TimeKeepCategoriesService) { }
  timeKeepCategories!: any[];
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      serverSide: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: true,
      processing: true,
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      language: {
        processing: 'Loading Hourly Rates...',
        emptyTable: 'No Hourly Rates available.'
      },
      columns: [ {
        title: 'Title',
        data: 'title',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxTimeKeepCategories.bind(this)
    };
  }

  ajaxTimeKeepCategories(dTParams: any, callback: any) {
    this.timeKeepCategory.getTimeKeepCategories(dTParams).subscribe(({records, totalRecords}) => {
      this.timeKeepCategories = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteTimeKeepCategory(id: number) {
    this.timeKeepCategory.deleteTimeKeepCategory(id).subscribe((res) => {
      if (res == 1) {
        this.timeKeepCategories = this.timeKeepCategories.filter(({hourlyRateId}) => hourlyRateId != id)
      }
    });
  }
}
