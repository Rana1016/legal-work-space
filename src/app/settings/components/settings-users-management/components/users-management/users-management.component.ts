import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  constructor(private user: UserService, private modalService: NgbModal) { }
  users!: any[];
  dtOptions: any;
  SignatureUpload!: File;
  @ViewChild('signatureUpload') SignatureUploadModal!: TemplateRef<any>;
  currentGroupId: any;

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
      })
    })
  }

  deleteUser(userId: number) {
    this.user.deleteUser(userId).subscribe((res) => { if (res == 1) { this.users = this.users.filter((user) => user.userId != userId) } });
  }

  openSignatureUpload(id: number) {
    this.currentGroupId = id;
    this.modalService.open(this.SignatureUploadModal)
  }

  setSignature(e: any) {
    this.SignatureUpload =  e.target.files.item(0);
  }
  uploadSignature() {
    console.log(this.SignatureUpload)
  }

}
