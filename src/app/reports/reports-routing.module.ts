import { ReportsComponent } from './reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountStatementComponent } from './components/account-statement/account-statement.component';
import { TrialBalanceComponent } from './components/trial-balance/trial-balance.component';
import { ReportsMainComponent } from './components/reports-main/reports-main.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'reports-main',
  //   pathMatch: 'full'
  // },
  {
    path: "",
    component:ReportsComponent,
    children : [
      {
        path: "",
        component: ReportsMainComponent
      },
      {
        path : "account-statement",
        component : AccountStatementComponent
      },
      {
        path : "trial-balance",
        component : TrialBalanceComponent
      },
      {
        path: "**",
        redirectTo: "dashboard"
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
