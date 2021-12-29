import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  constructor(private user: UserService) { }
  users!: any[];
  dtOptions: any;
  ngOnInit(): void {
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
        emptyTable: 'No Users available.'
      },
      columns: [{
        title: 'Name',
        width: '180',
        data: 'name',
        orderable: true
      }, {
        title: 'Email',
        width: '250',
        data: 'email',
        orderable: false,

      }, {
        title: 'Location',
        width: '100',
        data: 'locationId',
        orderable: false
      }, {
        title: 'Group',
        width: '200',
        data: 'groupId',
        orderable: false
      }, {
        title: 'Job title',
        width: '100',
        orderable: false,
        data: 'jobTitle'
      }, {
        title: 'Job Type',
        width: '200',
        orderable: false,
        data: 'jobType'
      }, {
        title: 'Status',
        width: '150',
        orderable: false,
        data: 'status'
      }, {
        title: 'Actions',
        width: '100',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxUsers.bind(this)
    };
  }

  ajaxUsers(dTParams: any, callback: any) {
    this.user.getAll(dTParams).subscribe(({ records, totalRecords }) => {
      this.users = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    })
  }

  deleteUser(userId: number) {
    this.user.deleteUser(userId).subscribe((res) => { if (res == 1) { this.users = this.users.filter((user) => user.UserId != userId) } });
  }

}
