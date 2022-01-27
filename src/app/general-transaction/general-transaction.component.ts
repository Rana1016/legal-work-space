import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormArray} from '@angular/forms';
import { ChartsOfAccountsService } from "src/app/shared/services/charts-of-accounts.service";

import { SharedService } from "src/app/shared/services/shared.service"

@Component({
  selector: 'app-general-transaction',
  templateUrl: './general-transaction.component.html',
  styleUrls: ['./general-transaction.component.scss']
})
export class GeneralTransactionComponent implements OnInit {
  mainClassSelectedId: any;
  isDisable: boolean = false;
  // isDebit:boolean=false

  constructor(private chartAccounts: ChartsOfAccountsService, private fb: FormBuilder, private lookup: SharedService) {}
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
    this.addDebit= 0
    this.empForm = this.fb.group({
      mainClass: [],
      subClass: [],
      generalLedger: [],
      narations:[],
      cases: [],
      clients: [],
      credits: [],
      debits: [],
      // tdata: this.fb.array([
      //   this.fb.control(''),
      //   this.mainClass,
      //   this.subClass,
      //   this.generalLedger,
      //   this.cases,
      //   this.clients,
      //   this.credits,
      //   this.debits
      // ])
    })
    this.cCheck = false;
    this.dCheck = false;


    this.dtOptions = {

    }
    // this.showMainClass();
    this.getGeneralLedgerById();
    this.getAllCases();
  }
  // creditCheck() {
  //   if (this.cCheck && !this.dCheck) {
  //     return this.cCheck = false
  //   }
  //   else {
  //     return this.dCheck = true;


  //   }
  // }

  // debitCheck() {
  //   if (this.dCheck && !this.cCheck) {
  //     return this.dCheck=false
  //   }
  //   else {
  //  return this.cCheck=true

  //   }
  // }

  disableFields(value: any) {
    console.log(value);
    if (value === 'credit') {
      this.cCheck = false;
      this.dCheck = true;
      this.empForm.patchValue({
        "debits" : ''
      })
    } else {
      this.dCheck = false;
      this.cCheck = true;
      this.empForm.patchValue({
        "credits" : ''
      })
    }
   }
//   disable() {

// if (this.credits!==null) {
//   this.isDisable=false
// } else {
//   this.isDisable=true
// }
//   }

  // disableField() {

  //   if (this.credits == undefined) {
  //     this.isDisabled=false
  //     } else {
  //     this.isDisabled=true
  //     }
  // }
  // showMainClass(){

  //   this.lookup.getOptions('tblMainClass', 'mainClassId', 'head').subscribe((res) => {
  //     console.log(res)
  //     this.mainClass=res

  //   });

  // }
  getAllCases(){

    this.lookup.getOptions('tblCaseMaster', 'caseId', 'caseId').subscribe((res) => {
      // console.log(res)
      this.cases=res

    });

  }


  onChange(event: any, type : string) {
    // this.mainClassSelectedId = event.value;
    // switch (type) {
    //   case 'subclass':
    //     this.getSubclassesById(event.value);
    //     break;
    //   case 'generalLedger':
    //     this.getGeneralLedgerById(event.value);
    //     break;
    //   default:
    //     break;
    // }
    switch (type) {
      case 'clients':
        this.getClients(event.value);
        break;
      default:
        break;
    }

  }

  // getSubclassesById(mainClassSelectedId: any) {
  //   this.lookup.getOptions('tblSubClass', 'subClassId', 'head', 'mainClassId', `${mainClassSelectedId}`).subscribe((res) => {
  //     // console.log(res)
  //     this.subClass=res

  //   });
  // }
  getGeneralLedgerById() {
    this.lookup.getOptions('tblGeneralLedger', 'generalLedgerId', 'head') .subscribe((res) => {
      // console.log(res)
      this.generalLedger = res;
      console.log("🚀 ~ file: general-transaction.component.ts ~ line 183 ~ GeneralTransactionComponent ~ this.lookup.getOptions ~ this.generalLedger", this.generalLedger);
    });

  }

  getClients(caseSelectedId: any) {
    this.lookup.getOptions('tblClient', 'clientId', 'clientId', 'caseId', `${caseSelectedId}`).subscribe((res) => {
      // console.log(res)
      this.clients = res

    });
  }
  // ChangeData(event: any) {
  //   // this.empForm.get('generalLedger')?.patchValue(event.displayValue);
  // console.log("🚀 ~ file: general-transaction.component.ts ~ line 196 ~ GeneralTransactionComponent ~ ChangeData ~ event", event)

  // }

  submitForm() {
    console.log('empFrom Data submit',this.empForm)
    // this.dummyData = this.empForm.value
    // this.tData.push(this.fb.control(''));

    this.showData = this.empForm.value;
    console.log(this.showData)
    this.dummyData.push(this.showData)
    console.log()
    this.empForm.reset()

    //  this.getDebits = this.empForm.value
    // this.addDebit.push(this.getDebits)
    // console.log(this.getDebits)
    // this.dummyData.push(this.showData.subClass)
    // this.dummyData.push(this.showData.generalLedger)
    // this.dummyData.push(this.showData.cases)
    // this.dummyData.push(this.showData.client)
  }

    submitData(){

      this.dummyData.forEach((data) => {
        console.log("🚀 ~ file: general-transaction.component.ts ~ line 224 ~ GeneralTransactionComponent ~ this.dummyData.forEach ~ data", data);
        if (Number(data.debits)) {

          this.addDebit += Number(data.debits)
        }
        else if (Number(data.credits)) {

          this.addCradit += Number(data.credits)
        }
          // this.finalDebit = this.addDebit

          // this.finalcradit = this.addCradit

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

    // this.debits.push(this.mainClass)
  }

  // get tData() {
  //   return this.empForm.get('Table-Data') as FormArray;
  // }
  // addCredit: any[] = this.dummyData.map(t => console.log(t.credits))



}
