import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormBuilder} from '@angular/forms';
import * as moment from 'moment';
import { GeneralTransactionService } from 'src/app/shared/services/general-transaction.service';
@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.scss']
})
export class AccountStatementComponent implements OnInit {
  generalLedger!: any[];
  accountStatementForm: any;
  isLoading : any;
  accountStatementData: any;
  constructor(private lookup: SharedService, private fb : FormBuilder, private journalDetail: GeneralTransactionService) { 
 
    this.accountStatementForm = this.fb.group({
      fromDate : [`${moment().format('YYYY-MM-DD')}T00:00:00.000Z`],
      toDate : [`${moment().format('YYYY-MM-DD')}T00:00:00.000Z`],
      ledgerId : ['']
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
  searchAccStatement(){
    this.isLoading = true;
    console.log(this.accountStatementForm.value);
    this.journalDetail.getAccountStatementDetails(this.accountStatementForm.value.fromDate, this.accountStatementForm.value.toDate, this.accountStatementForm.value.ledgerId).subscribe((res) => {
      console.log(res);
      this.accountStatementData = res;
      this.isLoading = false;
    })
  }
  
  printAccStatement(){
    window.print();
  }
}
