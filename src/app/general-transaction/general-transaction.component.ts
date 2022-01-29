import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormArray} from '@angular/forms';
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

  constructor(private journalVouvher: GeneralTransactionService, private user: UserService, private fb: FormBuilder, private lookup: SharedService) { }
  dummyData!: any[];
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

    this.dummyData = [];
    this.addCradit = 0
    this.finalDebit = 0
    this.finalcradit = 0;
    this.addDebit = 0
    this.empForm = this.fb.group({
      createdBy: [this.user.getUser.userId],
      createdDate: [new Date().toISOString()],
      // mainClass: [],
      // subClass: [],
      generalLedger: [],
      narations: [],
      cases: [],
      clients: [],
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
        "debits": ''
      })
    } else {
      this.dCheck = false;
      this.cCheck = true;
      this.empForm.patchValue({
        "credits": ''
      })
    }
  }


  // showMainClass(){

  //   this.lookup.getOptions('tblMainClass', 'mainClassId', 'head').subscribe((res) => {
  //     console.log(res)
  //     this.mainClass=res

  //   });

  // }
  getAllCases() {

    this.lookup.getOptions('tblCaseMaster', 'caseId', 'caseId').subscribe((res) => {
      // console.log(res)
      this.cases = res

    });

  }


  onChange(event: any) {

    this.getClients(event.keyValue)

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
    this.showData = this.empForm.value;
    this.showData.createdBy = this.user.getUser.userId;
    this.showData.createdDate = new Date().toISOString();
    console.log(this.showData)
    this.dummyData.push(this.showData)
    console.log()
    this.empForm.reset()
  }

  submitData() {
    this.journalVouvher.addNewJournalVoucher(this.dummyData).subscribe((res) => {
      res = this.dummyData
      console.log(res)

})
    this.dummyData.forEach((data) => {
      if (Number(data.debits)) {
        this.addDebit += Number(data.debits)
      }
      else if (Number(data.credits)) {
        this.addCradit += Number(data.credits)
      }
    })
    if (this.addDebit === this.addCradit) {
      alert('Data successfully enter')
      this.addDebit = 0;
      this.addCradit = 0;
    }
    else {
      alert('ERROR!!! data is not submited')
      this.addDebit = 0;
      this.addCradit = 0;
    }

    // if (this.journalVouvher.addNewJournalVoucher(this.empForm.value))

  }

}
