import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormArray, Validators} from '@angular/forms';
import { Router } from '@angular/router';
// import { ConsoleReporter } from 'jasmine';
// import { ChartsOfAccountsService } from "src/app/shared/services/charts-of-accounts.service";
import { GeneralTransactionService } from "src/app/shared/services/general-transaction.service";

import { SharedService } from "src/app/shared/services/shared.service"
import { UserService } from "src/app/shared/services/user.service";


@Component({
  selector: 'app-general-transaction',
  templateUrl: './general-transaction.component.html',
  styleUrls: ['./general-transaction.component.scss']
})
export class GeneralTransactionComponent implements OnInit {
  mainClassSelectedId: any;
  isDisable: boolean = false;
  selectedCaseId: any;
  selectedClientId: any;

  constructor(private journalVouvher: GeneralTransactionService, private user: UserService, private fb: FormBuilder, private lookup: SharedService, private router : Router) { }
  voucherData!: any[];
  addDebit!: number;
  addCradit!: number;
  finalDebit!: number;
  finalcradit!: number;

  mainClass!: any[];
  subClass!: any[];
  generalLedger!: any[];
  cases!: any[];
  clients!: any[];
  showData: any;
  narations!: any[];


  credits!: any[];
  dtOptions!: DataTables.Settings;
  empForm!: FormGroup;
  cCheck!: Boolean;
  dCheck!: Boolean;

  ngOnInit(): void {

    this.voucherData = [];
    this.addCradit = 0
    this.finalDebit = 0
    this.finalcradit = 0;
    this.addDebit = 0
    this.empForm = this.fb.group({
      createdBy: [this.user.getUser.userId],
      createdDate: [new Date().toISOString()],
      // mainClass: [],
      // subClass: [],
      generalLedger: ['' , [Validators.required]],
      narations: ['', [Validators.required]],
      cases: ['', [Validators.required]],
      clients: ['', [Validators.required]],
      credits: [],
      debits: [],

    })
    this.cCheck = false;
    this.dCheck = false;


    this.dtOptions = {

    }
    this.getGeneralLedgerById();
    this.getAllCases();
  }


  disableFields(value: any) {
    console.log(value);
    if (value === 'credit') {
      this.cCheck = false;
      this.dCheck = true;
      this.empForm.patchValue({
        "debits": 0
      })
    } else {
      this.dCheck = false;
      this.cCheck = true;
      this.empForm.patchValue({
        "credits": 0
      })
    }
  }

  getAllCases() {

    this.lookup.getOptions('tblCaseMaster', 'caseId', 'caseId').subscribe((res) => {
      this.cases = res

    });

  }


  onChange(event: any) {
    this.selectedCaseId = event.keyValue;
    this.getClients(event.keyValue)

  }
  onChangeClient(event : any){
    this.selectedClientId = event.keyValue;
    
  }

  // getSubclassesById(mainClassSelectedId: any) {
  //   this.lookup.getOptions('tblSubClass', 'subClassId', 'head', 'mainClassId', `${mainClassSelectedId}`).subscribe((res) => {
  //     // console.log(res)
  //     this.subClass=res

  //   });
  // }
  getGeneralLedgerById() {
    this.lookup.getOptions('tblGeneralLedger', 'generalLedgerId', 'head').subscribe((res) => {
      this.generalLedger = res;
    });

  }

  getClients(caseSelectedId: any) {
    this.lookup.getOptions('tblperson', 'personId', 'name', 'caseId', `${caseSelectedId}`).subscribe((res) => {
      this.clients =res
    });
  }


  addrow() {
    // this.showData = this.empForm.value;
    this.showData = {
      "createdBy": this.user.getUser.userId,
      "createdDate": new Date().toISOString(),
      "voucherId": 0,
      "caseId": this.selectedCaseId,
      "credit": parseFloat(this.empForm.value.credits),
      "debit": parseFloat(this.empForm.value.debits),
      "narration": this.empForm.value.narations,
      "generalLedgerId": this.empForm.value.generalLedger,
      "clientId": this.selectedClientId,
      "masterId": 0
    }
    if(this.showData.credit != null && this.showData.debit != null ){
      this.voucherData.push(this.showData);
      // this.empForm.reset();
      this.empForm.patchValue({
        "generalLedger": '',
        "narations": '',
        "credits" : 0,
        "debits" : 0,
        "cases" : this.selectedCaseId,
        "clients" : this.selectedClientId
      })
      this.empForm.controls['cases'].disable();
      this.empForm.controls['clients'].disable();
    }else{
      alert('Please Enter Credit or Debit')
    }
    
    
  }

  submitData() {

    this.voucherData.forEach((data) => {
      this.addDebit += data.debit
      this.addCradit += data.credit
    })
    if (this.addDebit === this.addCradit) {
      this.journalVouvher.addNewJournalVoucher(this.voucherData).subscribe((res) => {
        res = this.voucherData
        this.addDebit = 0;
        this.addCradit = 0;
        this.router.navigate(['/settings/journal-voucher']);
      })
    }
    else {
      alert('ERROR!!! Credit and Debit are not Equal')
      this.addDebit = 0;
      this.addCradit = 0;
    }

    // if (this.journalVouvher.addNewJournalVoucher(this.empForm.value))

  }

}
