import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-document-template',
  templateUrl: './document-template.component.html',
  styleUrls: ['./document-template.component.scss']
})
export class DocumentTemplateComponent implements OnInit {
  constructor(private fb: FormBuilder, private docSvc: SharedService) { }
  docData!: FormControl;
  ngOnInit(): void {
    this.docData = this.fb.control('');
  }

  clog(d: any) {
    console.log(this.docData)
  }

}
