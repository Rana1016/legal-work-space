import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsBankAccountsRoutingModule } from './settings-bank-accounts-routing.module';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { NewBankAccountComponent } from './components/new-bank-account/new-bank-account.component';


@NgModule({
  declarations: [
    BankAccountsComponent,
    NewBankAccountComponent,
  ],
  imports: [
    CommonModule,
    SettingsBankAccountsRoutingModule
  ]
})
export class SettingsBankAccountsModule { }
