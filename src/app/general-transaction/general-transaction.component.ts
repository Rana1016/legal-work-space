import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartsOfAccountsService } from "src/app/shared/services/charts-of-accounts.service";

import { SharedService } from "src/app/shared/services/shared.service"

@Component({
  selector: 'app-general-transaction',
  templateUrl: './general-transaction.component.html',
  styleUrls: ['./general-transaction.component.scss']
})
export class GeneralTransactionComponent implements OnInit {
  mainClassSelectedId: any;
  constructor(private chartAccounts:ChartsOfAccountsService, private fb:FormBuilder, private lookup:SharedService) { }
  mainClass!: any[];
  subClass!: any[];
  generalLedger!: any[];
  cases!: any[];
  clients!: any[];
  debits!: any [];
  credits!: any[];
  dtOptions!: DataTables.Settings;
  empForm!: FormGroup

  ngOnInit(): void {
    this.empForm = this.fb.group({
      mainClass: [''],
      subClass: [''],
      generalLedger: [''],
      cases: [''],
      clients: [''],
      credit: [''],
      debit:[''],
    })
    this.dtOptions = {

    }
    this.showMainClass();
    this.getAllCases();
  }
  showMainClass(){

    this.lookup.getOptions('tblMainClass', 'mainClassId', 'head').subscribe((res) => {
      console.log(res)
      this.mainClass=res

    });

  }
  getAllCases(){

    this.lookup.getOptions('tblCaseMaster', 'caseId', 'totalRecords').subscribe((res) => {
      // console.log(res)
      this.cases=res

    });

  }
  onChange(event: any, type : string) {
    // this.mainClassSelectedId = event.value;
    switch (type) {
      case 'subclass':
        this.getSubclassesById(event.value);
        break;
      case 'generalLedger':
        this.getGeneralLedgerById(event.value);
        break;
      default:
        break;
    }

  }

  getSubclassesById(mainClassSelectedId: any) {
    this.lookup.getOptions('tblSubClass', 'subClassId', 'head', 'mainClassId', `${mainClassSelectedId}`).subscribe((res) => {
      // console.log(res)
      this.subClass=res

    });
  }
  getGeneralLedgerById(subClassSelectedId: any) {
    this.lookup.getOptions('tblGeneralLedger', 'generalLedgerId', 'head', 'subClassId', `${subClassSelectedId}`).subscribe((res) => {
      // console.log(res)
      this.generalLedger=res
    });
   }
  submitForm() {
    console.log(this.empForm)

    this.debits.push(this.mainClass)
  }
}