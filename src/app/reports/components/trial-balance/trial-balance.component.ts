import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormBuilder} from '@angular/forms';
import * as moment from 'moment';
import { GeneralTransactionService } from 'src/app/shared/services/general-transaction.service';
@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss']
})
export class TrialBalanceComponent implements OnInit {
  trialBalanceForm: any;
  generalLedger!: any[];
  isLoading!: boolean;
  trialBalanceData: any;

  constructor(private lookup: SharedService, private fb : FormBuilder, private journalDetail: GeneralTransactionService) { 
    this.trialBalanceForm = this.fb.group({
      fromDate : [`${moment().format('YYYY-MM-DD')}T00:00:00.000Z`],
      toDate : [`${moment().format('YYYY-MM-DD')}T00:00:00.000Z`],
      glIds : [[]]
    })
  }

  ngOnInit(): void {
    this.getGeneralLedgerById();
  }
  getGeneralLedgerById() {
    this.lookup.getOptions('tblGeneralLedger', 'generalLedgerId', 'head').subscribe((res) => {
      this.generalLedger = res;
    });

  }

  searcTrialBalance(){
    this.isLoading = true;
    console.log(this.trialBalanceForm.value);
    
    this.journalDetail.getTrialBalanceDetails(this.trialBalanceForm.value.fromDate, this.trialBalanceForm.value.toDate, this.trialBalanceForm.value.glIds.toString()).subscribe((res) => {
      console.log(res);
      this.trialBalanceData = res;
      this.isLoading = false;
    })
  }
  printAccStatement(){
    window.print();
  }
}
