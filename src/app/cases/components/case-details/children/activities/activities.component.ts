import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  constructor(private activityService: ActivityService, private router: Router) { }
  caseId!: number;
  dtOptions: DataTables.Settings = {};
  activities!: any[];

  ngOnInit(): void {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
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
        emptyTable: 'No activities available.',
        processing: 'Loading Activities...'
      },
      columns: [{
        title: 'Case Ref',
        width: '150',
        data: 'caseId',
        orderable: false
      }, {
        title: 'Time',
        width: '150',
        data: 'activityTime',
        orderable: true
      }, {
        title: 'Type',
        width: '100',
        data: 'activityType',
        orderable: false
      }, {
        title: 'Description',
        width: '550',
        orderable: false,
        data: 'activityDescription'
      }, {
        title: 'Added By',
        width: '250',
        data: 'activityAuthor',
        orderable: false,
      }],
      ajax: this.dTAjax.bind(this)
    };
  }

  dTAjax(dTParams: any, callback: (data: any) => void) {
    this.activityService.getActivitiesByCaseId(dTParams, this.caseId).subscribe(({records, totalRecords}) => {
      this.activities = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    })
  }
}
