import { Component, OnInit } from '@angular/core';
import { CaseCategoriesService } from 'src/app/shared/services/case-categories.service';
import { GeneralTransactionService } from "src/app/shared/services/general-transaction.service";
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-journal-voucher-transactions',
  templateUrl: './journal-voucher-transactions.component.html',
  styleUrls: ['./journal-voucher-transactions.component.scss']
})
export class JournalVoucherTransactionsComponent implements OnInit {
  constructor( private journalVoucher:GeneralTransactionService) { }
  journalTransaction!: any[];
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
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
        processing: 'Loading Journal Voucher...',
        emptyTable: 'No Journal Voucher available.'
      },
      columns: [{
        title: 'Title',
        data: 'description',
        orderable:true
      },{
        title: 'Created By',
        data: 'createdBy',
        orderable:true
      },

        {
          title: 'Date',
          data: 'createdDate',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxjournalVoucher.bind(this)
    };
  }

  ajaxjournalVoucher(dTParams: any, callback: any) {
    this.journalVoucher.getJournalVouchersMaster(dTParams).subscribe(({records, totalRecords}) => {
      this.journalTransaction = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  // deleteCaseCategory(id: number) {
  //   this.caseCategory.deleteCaseCategory(id).subscribe((res) => {
  //     if (res == 1) {
  //       this.caseCategories = this.caseCategories.filter(({categoryId}) => categoryId != id)
  //     }
  //   });
  // }
}

