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
  constructor(private journalDetail: GeneralTransactionService, private lookup: SharedService, private route: ActivatedRoute) { }
  journalDetailById!: any[];
  dtOptions!: DataTables.Settings;
  MasterId!: number;
  journalDetailTitle!: string;
  dtTrigger: Subject<any> = new Subject();

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
        processing: 'Loading Journal Voucher Detail...',
        emptyTable: 'No Journal Voucher Detail available.'
      },
      columns: [{
        title: 'Main Class',
        data: 'mainClassHead',
        orderable: true
      },
      {
        title: 'Sub Class',
        data: 'subClassHead',
        orderable: true
        },
      {
        title: 'General Ledger Class',
        data: 'generalLedgerHead',
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

        {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      destroy: true,
      ajax: this.ajaxjournalVoucher.bind(this)
    };
  };

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.route.params.subscribe(({journalId}) => {
      this.MasterId = Number(journalId);
      this.journalDetail.getVoucherDetailsById(journalId).subscribe((journalTransaction: any) => {
        this.journalDetailTitle = journalTransaction.journalDetailTitle
      });
      this.dtTrigger.next();
    });
  }

  ajaxjournalVoucher(dTParams: any, callback: any) {
    this.lookup.getTableOptions(dTParams, 'tblJournalTransaction',  'VoucherTitle', 'MasterId', `${this.MasterId}`).subscribe(({records, totalRecords}) => {
      this.journalDetailById = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
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

