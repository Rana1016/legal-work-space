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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountStatementComponent } from './components/account-statement/account-statement.component';
import { TrialBalanceComponent } from './components/trial-balance/trial-balance.component';
import { ReportsMainComponent } from './components/reports-main/reports-main.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    ReportsComponent,
    FinanceComponent,
    SalesVatComponent,
    UnpaidInvoicesComponent,
    UnpaidDisbComponent,
    DebtorsComponent,
    IncomeComponent,
    AccountStatementComponent,
    TrialBalanceComponent,
    ReportsMainComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    HighchartsChartModule,
    FormsModule,
    NgbDatepickerModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
