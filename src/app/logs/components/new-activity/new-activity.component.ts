import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogbookFolderService } from 'src/app/shared/services/logbook-folder.service';
import { LogbookService } from 'src/app/shared/services/logbook.service';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss']
})
export class NewActivityComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private logBook: LogbookService, private logBookFolder: LogbookFolderService, private fb: FormBuilder) { }
  edit!: number;
  logBookFolderId!: number;
  newLogForm!: FormGroup;
  ngOnInit(): void {
    this.route.params.subscribe(({logBookFolderId, logId}) => {
      this.edit = Number(logId);
      this.logBookFolderId = logBookFolderId;
      this.logBookFolder.getLogBookFolderById(logBookFolderId).subscribe((logBookFolder) => {
        this.title = logBookFolder.title;
      });
      logId && this.logBook.getLogBookById(this.edit).subscribe((log) => {
        this.newLogForm.patchValue(log);
      });
    });

    this.newLogForm = this.fb.group({
      caseId: [''],
      date: [new Date().toISOString()],
      title: [''],
      reference: [''],
      additionalInfo: [''],
      logBookFolderId: [this.logBookFolderId || 0],
      documentPath: ['']
    });
  }

  title!: string;
  docToUpload?: any;
  fileChange({files}: {files: FileList}) {
    this.docToUpload = <File>files.item(0);
  }

  submitForm() {
    (!this.edit ?
      this.logBook.addLogBook({...this.newLogForm.value, caseId: Number(this.newLogForm.value.caseId)}, this.docToUpload)
      : this.logBook.updateLogBookById(this.edit, {...this.newLogForm.value, caseId: Number(this.newLogForm.value.caseId)}, this.docToUpload)
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}
