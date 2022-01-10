import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-groups-management',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.scss']
})
export class GroupsManagementComponent implements OnInit {
  constructor(private group: GroupService) { }
  groups!: any[];
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
        infoEmpty: '',
        emptyTable: 'No Groups available.'
      },
      columns: [{
        title: 'Group Title',
        width: '250',
        data: 'groupTitle',
        orderable: true
      }, {
        title: 'Can Manage Activities',
        width: '150',
        data: 'canManageActivities',
        orderable: false,
        
      }, {
        title: 'Can Manage Case-categories',
        width: '180',
        data: 'canManageCaseCategories',
        orderable: false
      }, {
        title: 'Can Manage Users',
        width: '150',
        data: 'canManageUsers',
        orderable: false
      }, {
        title: 'Can Manage Peshis',
        width: '150',
        data: 'canManagePeshi',
        orderable: false
      }, {
        title: 'Can Manage Case',
        width: '150',
        data: 'canManageCase',
        orderable: false
      }, {
        title: 'Actions',
        width: '100',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxGroups.bind(this)
    };
  }

  ajaxGroups(dTParams: any, callback: any) {
    this.group.getAll(dTParams).subscribe(({records, totalRecords}) => {
      this.groups = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    })
  }

  deleteGroup(id: number) {
    this.group.deleteGroup(id).subscribe((res) => {
      if (res == 1) {
        this.groups = this.groups.filter(({groupId}) => groupId != id)
      }
    });
  }

}
