import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CasesService } from 'src/app/shared/services/cases.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  constructor(private router: Router, private caseSvc: CasesService, private common: SharedService, private fb: FormBuilder, private modal: NgbModal) { }
  documents!: any[];
  dtOptions!: DataTables.Settings;
  caseId!: number;
  uploadMode: string = 'single';
  uploadDocForm!: FormGroup;
  @ViewChild('documentUpload') DocumentUpload!: TemplateRef<any>;
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
    this.uploadDocForm = this.fb.group({
      sharedWithClient: ['0'],
      files: [null]
    });
  }

  ajaxDocuments(dTParams: any, callback: any) {
    this.caseSvc.getDocumentsByCaseId(this.caseId, dTParams).subscribe(({totalRecords, records}) => {
      this.documents = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        // data: records
      })
    })
  }

  uploadOpen(uploadMode: string) {
    this.uploadMode = uploadMode;
    this.modal.open(this.DocumentUpload)
  }

  files: any[] | any;

  selectDoc(Files: FileList) {
    this.files = this.uploadMode == 'multi' ? Files : Files.item(0);
  }

  uploadDoc() {
    (this.uploadMode == 'single' ? this.common.uploadSingleDocument(this.caseId, this.uploadDocForm.value.sharedWithClient != '0', this.files)
    : this.common.uploadMultipleDocuments(this.caseId, this.uploadDocForm.value.sharedWithClient != '0', this.files)).subscribe()
  }
}
