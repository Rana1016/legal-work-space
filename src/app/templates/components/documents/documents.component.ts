import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentTemplateService } from '../../../shared/services/document-template.service'
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  dtOptions!: DataTables.Settings;
  documentTemplates: any;
  search = '';
  dtTrigger: Subject<any> = new Subject();
  constructor(private docTempSvc: DocumentTemplateService) { }

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
        processing: 'Loading Document Templates...',
        emptyTable: 'No Document Template available.'
      },
      columns: [{
        title: 'Date & Time',
        width: '700',
        data: 'createddate',
        orderable: true
      }, {
        title: 'Title',
        width: '700',
        data: 'title',
        orderable: false
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      destroy: true,
      ajax: this.ajaxConsultations.bind(this)
    };
  }
  ajaxConsultations(dTParams: any, callback: any) {
    this.docTempSvc.getAll(dTParams, this.search).subscribe(({records, totalRecords}) => {
      this.documentTemplates = records;
      console.log(this.documentTemplates);
      
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  onSubmit() {
    this.dtTrigger.next();
  }
  deleteDocTemp(id: number) {
    this.docTempSvc.deleteDocumentTemplate(id).subscribe((res) => {
      if (res == 1) {
        this.documentTemplates = this.documentTemplates.filter((document : any) => document.documentid != id)
      }
    });
  }
}
