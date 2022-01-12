import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { TimeKeepCategoriesService } from 'src/app/shared/services/time-keep-categories.service';

@Component({
  selector: 'app-time-keep-sub-categories',
  templateUrl: './time-keep-sub-categories.component.html',
  styleUrls: ['./time-keep-sub-categories.component.scss']
})
export class TimeKeepSubCategoriesComponent implements OnInit {
  constructor(private timeKeepSubCategory: TimeKeepCategoriesService, private route : ActivatedRoute) { }
  timeKeepSubCategories!: any[];
  dtOptions!: DataTables.Settings;
  dtTrigger: Subject<any> = new Subject();
  hourlyRateId?: number;
  hourlyRateTitle?: string;

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
        processing: 'Loading Hourly Rate Details...',
        emptyTable: 'No Hourly Rate Details available.'
      },
      columns: [{
        title: 'Rate',
        width: '150',
        data: 'hourlyRate',
        orderable: true
      }, {
        title: 'Title',
        data: 'title',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      destroy: true,
      ajax: this.ajaxTimeKeepCategories.bind(this)
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.route.params.subscribe(({hourlyRateId}) => {
      this.hourlyRateId = Number(hourlyRateId);
      this.timeKeepSubCategory.getTimeKeepCategoryById(hourlyRateId).subscribe((hourlyRate: any) => {
        this.hourlyRateTitle = hourlyRate.title;
      });
      this.dtTrigger.next();
    });
  }

  ajaxTimeKeepCategories(dTParams: any, callback: any) {
    this.timeKeepSubCategory.getTimeKeepSubCategories(this.hourlyRateId!, dTParams).subscribe(({records, totalRecords}) => {
      this.timeKeepSubCategories = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteTimeKeepSubCategory(id: number) {
    this.timeKeepSubCategory.deleteTimeKeepSubCategory(id).subscribe((res) => {
      if (res == 1) {
        this.timeKeepSubCategories = this.timeKeepSubCategories.filter(({hourlyRateDetailId}) => hourlyRateDetailId != id)
      }
    });
  }
}
