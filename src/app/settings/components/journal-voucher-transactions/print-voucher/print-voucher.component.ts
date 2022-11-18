import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralTransactionService } from 'src/app/shared/services/general-transaction.service';
import * as converter from 'number-to-words';
import { timeStamp } from 'console';
@Component({
  selector: 'app-print-voucher',
  templateUrl: './print-voucher.component.html',
  styleUrls: ['./print-voucher.component.scss']
})
export class PrintVoucherComponent implements OnInit {
  MasterId!: number;
  printMainData: any;
  printGlData: any;
  totalValues: any;

  constructor(private route: ActivatedRoute, private journalDetail: GeneralTransactionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(({voucherDetail}) => {
      this.MasterId = Number(voucherDetail);
      console.log(this.MasterId);
      this.getPrintVoucherDetails();
    });
  }
  getPrintVoucherDetails(){
    this.journalDetail.getPrintVoucherDetailsById(this.MasterId).subscribe((res : any) => {
      console.log(res);
      this.printMainData = res?.firstList[0];
      this.printGlData = res?.secondList;
      this.totalValues = res?.thirdList[0];
      
    })
  }
  print(){
    window.print();
  }
}
