import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CasesService } from 'src/app/shared/services/cases.service';
import { PeshiService } from 'src/app/shared/services/peshi.service';

@Component({
  selector: 'app-new-peshi',
  templateUrl: './new-peshi.component.html',
  styleUrls: ['./new-peshi.component.scss']
})
export class NewPeshiComponent implements OnInit {
  newPeshiForm: FormGroup;
  isValid?: boolean = true;
  clientName?: string = "";
  constructor(private router: Router, private fb: FormBuilder, private peshi: PeshiService, private route: ActivatedRoute, private caseService: CasesService) {
    this.newPeshiForm = this.fb.group({
      caseId: [''],
      previousProceedings: [''],
      previousDate: [new Date().toISOString()],
      nextDate: [new Date().toISOString()],
      remarks: [''],
      lawyerName: [''],
      lawyerFirmName: [''],
      lawyerAddress: [''],
      lawyerPhoneNumber: [''],
      lawyerEmail: [''],
      lawyerFax: [''],
      lawyerWhatsAppNumber: [''],
      lawyerOtherDetailsSpecify: ['']
    });
  }

  checkCase(caseId: string | number) {
    if ((<string>caseId).length >= 4) {
      caseId = Number(caseId)
      this.caseService.isValid(caseId).subscribe(({ message, clientName }: any) => {
        this.clientName = clientName;
        this.isValid = message == undefined
      })
    } else {
      this.isValid = true;
      this.clientName = "";
    }
  }

  ngOnInit(): void {

  }
  submitForm() {
    let data = {
      ...this.newPeshiForm.value,
      caseId: Number(this.newPeshiForm.value.caseId)
    }
    this.peshi.addPeshi(data).subscribe(res => res == 1 && this.router.navigate(['../..'], {relativeTo: this.route}));
  }
}
