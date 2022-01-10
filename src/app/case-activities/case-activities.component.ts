import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { ActivityService } from '../shared/services/activity.service';

@Component({
  selector: 'case-activities',
  templateUrl: './case-activities.component.html',
  styleUrls: ['./case-activities.component.scss']
})
export class CaseActivitiesComponent implements OnInit, AfterViewInit {
  searchForm!: FormGroup;
  currentDate!: string;
  data: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  activities!: any[];
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private activityService: ActivityService) { }
  ngOnInit(): void {
    this.route.params.subscribe(({ date }) => {
      let [day, month, year] = date.split('-');
      this.currentDate = `${moment({year, month: month - 1, day}).format('YYYY-MM-DD')}T00:00:00.000Z`
    });
    this.searchForm = this.fb.group({
      currentDate: [this.currentDate, Validators.required]
    });
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
        title: 'Time',
        width: '150',
        data: 'activityTime',
        orderable: true
      }, {
        title: 'Added By',
        width: '250',
        data: 'activityAuthor',
        orderable: false,

      }, {
        title: 'Case Ref',
        width: '150',
        data: 'caseId',
        orderable: false
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
      }],
      destroy: true,
      ajax: this.ajaxActivities.bind(this)
    };
  };

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.searchForm.valueChanges.subscribe(({ currentDate }) => {
      this.currentDate = currentDate;
      this.dtTrigger.next();
    });
  };

  ajaxActivities(dTParams: any, callback: any) {
    (!!this.currentDate ? this.activityService.getActivitiesByDate(dTParams, this.currentDate) : this.activityService.getActivities(dTParams)).subscribe(({ records, totalRecords }) => {
      this.activities = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    })
  }

  toDate(date: any) {
    return moment(date).format('DD-MM-YYYY')
  }
}
