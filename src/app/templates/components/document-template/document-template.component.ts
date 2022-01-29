import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from 'src/app/shared/services/user.service';
import { DocumentTemplateService } from '../../../shared/services/document-template.service'

@Component({
  selector: 'app-document-template',
  templateUrl: './document-template.component.html',
  styleUrls: ['./document-template.component.scss']
})
export class DocumentTemplateComponent implements OnInit {
  docForm: any;
  edit?: number;
  constructor(private fb: FormBuilder, private docTempSvc: DocumentTemplateService,private user: UserService,private router: Router, private route: ActivatedRoute) { }
  docData!: FormControl;
  ngOnInit(): void {
    this.route.params.subscribe(({documentId}) => {
      this.edit = Number(documentId);
      this.docTempSvc.getDocumentTemplateById(Number(documentId)).subscribe((documentTemplate) => {
        this.docForm.patchValue(documentTemplate)
      });
    });
    this.docForm = this.fb.group({
      createdDate : [new Date().toISOString()],
      createdBy: [this.user.getUser.userId],
      title : [''],
      content : [''],
      documentId : [0],
      modifiedBy: [this.user.getUser.userId],
      modifiedDate: [new Date().toISOString()]
    })
    this.docData = this.fb.control('<p>hi [NAME],</p><p>&nbsp;</p><p>my name is <strong>sikandar ali</strong></p><table style="border-collapse: collapse; width: 100%;" border="1"><tbody><tr><td style="width: 23.6838%;">&nbsp;</td></tr><tr><td style="width: 23.6838%;">&nbsp;</td></tr></tbody></table>');
  }

  clog(d: any) {
    console.log(this.docData)
  }

  submitDocTem(){
    
    if(this.edit){
      this.docForm.patchValue({
        modifiedDate : new Date().toISOString()
      })
    }
    console.log(this.docForm.value);
    (!this.edit ?
      this.docTempSvc.addDocumentTemplate(this.docForm.value)
      : this.docTempSvc.updateDocumentTemp(this.edit, this.docForm.value)).subscribe((res) => {
        if(res === 1){
          this.router.navigate(['/templates/documents'])
        }
    })
  }

}
