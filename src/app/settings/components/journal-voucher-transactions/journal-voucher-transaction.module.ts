import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { JournalVoucherTransactionRoutingModule } from './journal-voucher-transaction-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalVoucherTransactionsComponent } from './journal-voucher-transactions.component';
import { JournalVoucherDetailComponent } from './journal-voucher-detail/journal-voucher-detail.component';
import { PrintVoucherComponent } from './print-voucher/print-voucher.component';


@NgModule({
  declarations: [
    JournalVoucherTransactionsComponent,
    JournalVoucherDetailComponent,
    PrintVoucherComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    JournalVoucherTransactionRoutingModule
  ]
})
export class JournalVoucherTransactionModule { }
