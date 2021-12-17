import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-new-peshi',
  templateUrl: './new-peshi.component.html',
  styleUrls: ['./new-peshi.component.scss']
})
export class NewPeshiComponent implements OnInit {
  caseId: number;
  newPeshiForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 3]);
    this.newPeshiForm = this.fb.group({
      fileRef: [''],
      courtCaseNumber: [''],
      caseTitle: [''],
      natureOfCase: [''],
      categories: [[]],
      courts: [[]],
      nameOfJudge: [''],
      districtOrBench: [''],
      previousProceeding: [''],
      previousDate: [moment(new Date()).format('DD-MM-yyyy')],
      nextDate: [moment(new Date()).format('DD-MM-yyyy')],
      remarks: [''],
      caseOwner: [''],
      caseWorker: [''],
      caseClerk: [''],
      otherPartyLawyer: ['']
    });
  }

  ngOnInit(): void {

  }
  submitForm() {
    console.log(this.newPeshiForm.value)
  }
}
