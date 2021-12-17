import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  constructor(private activityService: ActivityService, private router: Router) { }
  
  data: any;
  caseId!: number;
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
    this.dtOptions = {
      responsive: true,
      // scrollX: true,
      order: [[0, "desc"]],
      paging: true,
      pageLength: 2,
      processing: true,
      pagingType: 'full_numbers',
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      lengthChange: false,
      language: {
        emptyTable: 'No activities till now.'
      },
      serverSide: true,
      ajax: this.dTAjax.bind(this),
      columns: [{
        title: 'Date',
        width: '150',
        data: 'activityDate',
        orderable: true
      }, {
        title: 'Type',
        width: '150',
        data: 'activityType',
        orderable: false,
        
      }, {
        title: 'Description',
        width: '550',
        data: 'activityDescription',
        orderable: false
      }, {
        title: 'Author',
        width: '100',
        data: 'activityAuthor',
        orderable: false
      }, {
        title: 'Actions',
        width: '100',
        orderable: false,
        defaultContent: ''
      }]
    };
  }

  dTAjax(data: any, callback: (data: any) => void) {
    console.log(data)
    // this.activityService.getActivitiesById(this.caseId, data.start+1, data.length).subscribe((data) => {
    //   this.data = data;
    //   callback({
    //     recordsTotal: (<any[]>data).length,
    //     recordsFiltered: (<any[]>data).length,
    //     data: data
    //   })
    // })
  }
}
