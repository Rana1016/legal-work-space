import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogbookFolderService } from 'src/app/shared/services/logbook-folder.service';
import { LogbookService } from 'src/app/shared/services/logbook.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  constructor(private route: ActivatedRoute, private logBookFolder: LogbookFolderService, private logBook: LogbookService) { }

  ngOnInit(): void {
    this.route.params.subscribe(({logBookFolderId}) => {
      this.logBookFolder.getLogBookFolderById(logBookFolderId).subscribe((logBookFolder) => {
        this.title = logBookFolder.title;
      });
      this.logBookFolderId = logBookFolderId;
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
        processing: 'Loading Logs...',
        emptyTable: 'No Logs available.'
      },
      columns: [{
        title: 'Case ID',
        width: '200',
        data: 'caseId',
        orderable: true
      }, {
        title: 'Date',
        width: '250',
        data: 'date',
        orderable: false
      }, {
        title: 'Title',
        width: '250',
        data: 'title',
        orderable: false
      }, {
        title: 'Reference',
        width: '300',
        data: 'reference',
        orderable: false
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxLogBooks.bind(this)
    };
  }

  logBooks!: any[];
  title!: string;
  dtOptions!: DataTables.Settings;
  logBookFolderId!: number;
  ajaxLogBooks(dTParams: any, callback: any) {
    this.logBook.getLogBookByLogBookFolderId(this.logBookFolderId, dTParams).subscribe(({records, totalRecords}) => {
      this.logBooks = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteLogBook(id: number) {
    this.logBook.deleteLogBook(id).subscribe((res) => {
      if (res == 1) {
        this.logBooks = this.logBooks.filter(({logBookId}) => logBookId != id)
      }
    });
  }
}