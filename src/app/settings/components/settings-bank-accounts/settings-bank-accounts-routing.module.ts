import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { NewBankAccountComponent } from './components/new-bank-account/new-bank-account.component';

const routes: Routes = [
  {
    path: '',
    component: BankAccountsComponent,
  },
  {
    path: 'new-bank-account',
    component: NewBankAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsBankAccountsRoutingModule { }
