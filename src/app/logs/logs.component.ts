import { Component, OnInit } from '@angular/core';
import { LogbookFolderService } from '../shared/services/logbook-folder.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  constructor(private logBookFolder: LogbookFolderService, private user: UserService) { }
  logBookFolders!: any[];
  title!: string;
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
        processing: 'Loading Log Book Folders...',
        emptyTable: 'No Log Book Folders available.'
      },
      columns: [{
        title: 'Name',
        width: '700',
        data: 'title',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxLogBookFolders.bind(this)
    };
  }

  ajaxLogBookFolders(dTParams: any, callback: any) {
    this.logBookFolder.getLogBookFolderByUserId(this.user.getUser.userId, dTParams).subscribe(({records, totalRecords}) => {
      this.logBookFolders = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteLogBookFolder(id: number) {
    this.logBookFolder.deleteLogBookFolder(id).subscribe((res) => {
      if (res == 1) {
        this.logBookFolders = this.logBookFolders.filter(({logBookFolderId}) => logBookFolderId != id)
      }
    });
  }
}
