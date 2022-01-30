import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { GeneralTransactionService } from "src/app/shared/services/general-transaction.service";
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-journal-voucher-detail',
  templateUrl: './journal-voucher-detail.component.html',
  styleUrls: ['./journal-voucher-detail.component.scss']
})
export class JournalVoucherDetailComponent implements OnInit, AfterViewInit {
  journalVoucerDetail: any;
  constructor(private journalDetail: GeneralTransactionService, private lookup: SharedService, private route: ActivatedRoute) { }
  journalDetailById!: any[];
  dtOptions!: DataTables.Settings;
  MasterId!: number;
  journalDetailTitle!: string;
  dtTrigger: Subject<any> = new Subject();
  search = '';
  ngOnInit(): void {
    this.route.params.subscribe(({voucherDetail}) => {
      this.MasterId = Number(voucherDetail);
      
    });
    this.dtOptions = {
      responsive: true,
      serverSide: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: true,
      processing: true,
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      language: {
        processing: 'Loading Journal Voucher Detail...',
        emptyTable: 'No Journal Voucher Detail available.'
      },
      columns: [
      {
        title: 'General Ledger Class',
        data: 'generalLedgerHead',
        orderable: true
        },{
        title: 'Main Class',
        data: 'mainClassHead',
        orderable: true
        },{
        title: 'Sub Class',
        data: 'subClassHead',
        orderable: true
        },
      {
        title: 'Client Name',
        data: 'clientName',
        orderable: true
        },
      {
        title: 'Narration',
        data: 'narration',
        orderable: true
        },
      {
        title: 'Debit',
        data: 'debit',
        orderable: true
        },
      {
        title: 'Credit',
        data: 'credit',
        orderable: true
        },

      {
        title: 'Case Id',
        data: 'caseId',
        orderable: true
        },

      //   {
      //   title: 'Actions',
      //   width: '50',
      //   orderable: false,
      //   data: null
      // }
    ],
      destroy: true,
      ajax: this.ajaxjournalVoucher.bind(this)
    };
  };

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    // this.route.params.subscribe(({voucherDetail}) => {
    //   this.MasterId = Number(voucherDetail);
    //   this.journalDetail.getVoucherDetailsById(voucherDetail, this.dtOptions).subscribe((journalTransaction: any) => {
    //     this.journalDetailTitle = journalTransaction.journalDetailTitle
    //   });
    //   this.dtTrigger.next();
    // });
  }

  ajaxjournalVoucher(dTParams: any, callback: any) {
    this.journalDetail.getVoucherDetailsById(this.MasterId, dTParams, this.search).subscribe((data : any) => {
      
      this.journalVoucerDetail = data.records;
      console.log(this.journalVoucerDetail);
      // this.jou = data
      callback({
        recordsTotal: data.totalRecords,
        recordsFiltered: data.totalRecords,
        data: []
      })
    });
  }

  // deleteCaseSubCategory(id: number) {
  //   this.lookup.deleteOption('tblCaseSubcategory', 'SubCategoryId', id).subscribe((res) => {
  //     if (res == 1) {
  //       this.journalDetailById = this.journalDetailById.filter(({subCategoryId}) => subCategoryId != id)
  //     }
  //   });
  // }
}

