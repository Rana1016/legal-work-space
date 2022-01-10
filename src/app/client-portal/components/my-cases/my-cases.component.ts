import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-cases',
  templateUrl: './my-cases.component.html',
  styleUrls: ['./my-cases.component.scss']
})
export class MyCasesComponent implements OnInit {
  constructor (private clientSvc: ClientService, private user: UserService) {}
  Cases: any;
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: true,
      processing: true,
      ordering: true,
      info: true,
      autoWidth: false,
      searching: true,
      serverSide: true,
      pagingType: 'full_numbers',
      language: {
        emptyTable: 'No cases available.',
        processing: 'Loading Cases...'
      },
      columns: [{
        title: 'Date',
        data: 'date',
        width: '200',
        orderable: true
      }, {
        title: 'Case Ref',
        data: 'caseRef',
        width: '150',
        orderable: false,
        
      }, {
        title: 'Client Name',
        data: 'clientName',
        width: '250',
        orderable: false
      }, {
        title: 'Matter Description',
        data: 'matterDescription',
        width: '550',
        orderable: false
      }],
      destroy: true,
      ajax: this.ajaxCases.bind(this)
    };
  }

  ajaxCases(dTParams: any, callback: any) {
    this.clientSvc.getClientCases(this.user.getUser.userId, dTParams).subscribe(({records, totalRecords}: any) => {
      this.Cases = records;
      callback({
        recordsFiltered: totalRecords,
        recordsTotal: totalRecords 
      })
    })
  }

}
