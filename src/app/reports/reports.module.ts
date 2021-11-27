import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { FinanceComponent } from './components/finance/finance.component';
import { SalesVatComponent } from './components/sales-vat/sales-vat.component';
import { UnpaidInvoicesComponent } from './components/unpaid-invoices/unpaid-invoices.component';
import { UnpaidDisbComponent } from './components/unpaid-disb/unpaid-disb.component';
import { DebtorsComponent } from './components/debtors/debtors.component';
import { IncomeComponent } from './components/income/income.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportsComponent,
    FinanceComponent,
    SalesVatComponent,
    UnpaidInvoicesComponent,
    UnpaidDisbComponent,
    DebtorsComponent,
    IncomeComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    HighchartsChartModule,
    FormsModule
  ]
})
export class ReportsModule { }
