import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ActivityService } from '../shared/services/activity.service';

@Component({
  selector: 'case-activities',
  templateUrl: './case-activities.component.html',
  styleUrls: ['./case-activities.component.scss']
})
export class CaseActivitiesComponent implements OnInit {
  searchForm!: FormGroup;
  date!: string;
  currentDate!: Date;
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private activityService: ActivityService) { }
  
  data: any;
  dtOptions!: DataTables.Settings;
  activities!: any[];
  ngOnInit(): void {
    this.route.params.subscribe(({date}) => {
      this.date = date
      this.currentDate = moment(date, 'DD-MM-YYYY').toDate();
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
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      language: {
        emptyTable: 'No activities available.'
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
      ajax: this.ajaxActivities.bind(this)
    };
  }
  ajaxActivities(dTParams: any, callback: any) {
    this.activityService.getActivities(dTParams).subscribe((data) => {
      this.activities = data;
      callback({
        recordsTotal: data.length,
        recordsFiltered: data.length,
        data: []
      })
    })
  }

}
