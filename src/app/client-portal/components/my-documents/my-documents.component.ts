import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.scss']
})
export class MyDocumentsComponent implements OnInit {
  constructor(private user: UserService, private clientSvc: ClientService, private router: Router) { }
  documents!: any[];
  dtOptions!: DataTables.Settings;
  caseId!: number;
  ngOnInit(): void {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
    this.dtOptions = {
      responsive: true,
      serverSide: true,
      // scrollX: true,
      order: [[0, "desc"]],
      paging: true,
      processing: true,
      pageLength: 10,
      pagingType: 'full_numbers',
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      lengthChange: false,
      language: {
        processing: 'Loading Documents...',
        emptyTable: 'No Documents available.'
      },
      columns: [{
        title: '#',
        width: '40',
        data: 'documentId',
        orderable: true
      }, {
        title: 'Path',
        width: '350',
        data: 'documentPath',
        orderable: false,
      }, {
        title: 'Shared with client',
        width: '150',
        data: 'sharedWithClient',
        orderable: false
      }, {
        title: 'Upload Date',
        width: '200',
        data: 'uploadedDate',
        orderable: false
      }, {
        title: 'Uploaded By',
        width: '250',
        data: 'uploadedBy',
        orderable: false
      }],
      ajax: this.ajaxDocuments.bind(this)
    };
  }

  ajaxDocuments(dTParams: any, callback: any) {
    this.clientSvc.getClientDocuments(this.user.getUser.userId, dTParams).subscribe(({totalRecords, records}) => {
      this.documents = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        // data: records
      })
    })
  }
}
