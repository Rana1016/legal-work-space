import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalVoucherDetailComponent } from './journal-voucher-detail/journal-voucher-detail.component';
import { JournalVoucherTransactionsComponent } from './journal-voucher-transactions.component';
import { PrintVoucherComponent } from './print-voucher/print-voucher.component';

const routes: Routes = [
  {
    path: '',
    component: JournalVoucherTransactionsComponent
  },
  {
    path: 'journalVoucher/:voucherDetail',
    component: JournalVoucherDetailComponent
  },
  {
    path: 'printjournalVoucher/:voucherDetail',
    component: PrintVoucherComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class JournalVoucherTransactionRoutingModule { }
