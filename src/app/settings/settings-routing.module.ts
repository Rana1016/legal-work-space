import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AreasOfPracticeComponent } from './components/areas-of-practice/areas-of-practice.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { TimeActivityCodesComponent } from './components/time-activity-codes/time-activity-codes.component';
import { VatRatesComponent } from './components/vat-rates/vat-rates.component';
import { WorkflowTemplatesComponent } from './components/workflow-templates/workflow-templates.component';
import { SettingsComponent } from './settings.component';
import { PendingVouchersComponent } from './components/pending-vouchers/pending-vouchers.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'global-settings',
    pathMatch: 'full'
  },
  {
    path: "",
    component: SettingsComponent,
    children: [
      {
        path: "areas-of-practice",
        loadChildren: () => import('src/app/settings/components/areas-of-practice/areas-of-practice.module').then(m => m.AreasOfPracticeModule)

      },
      {
        path: "bank-accounts",
        loadChildren: () => import('./components/settings-bank-accounts/settings-bank-accounts.module').then(m => m.SettingsBankAccountsModule)
      },
      {
        path: "calendar",
        component: CalendarComponent

      },
      {
        path: "contacts",
        component: ContactsComponent

      },
      {
        path: "global-settings",
        component: GlobalSettingsComponent

      },
      {
        path: "hourly-rates",
        loadChildren: () => import('./components/settings-hourly-rates/settings-hourly-rates.module').then(m => m.SettingsHourlyRatesModule)

      },
      {
        path: "office-locations",
        loadChildren: () => import('./components/settings-office-locations/settings-office-locations.module').then(m => m.SettingsOfficeLocationsModule)
      },
      {
        path: "quiz",
        component: QuizComponent

      }, {
        path: "time-activity-codes",
        component: TimeActivityCodesComponent

      }, {
        path: 'groups-management',
        loadChildren: () => import('./components/settings-groups-management/settings-groups-management.module').then(m => m.SettingsGroupsManagementModule)
      },
      {
        path: "user-management",
        loadChildren: () => import('./components/settings-users-management/settings-users-management.module').then(m => m.SettingsUsersManagementModule)

      }, {
        path: "vat-rates",
        loadChildren: () => import('src/app/settings/components/vat-rates/vat-rates.module').then(m => m.VatRatesModule)

      }, {
        path: "workflow-templates",
        loadChildren: () => import('src/app/settings/components/workflow-templates/workflow-templates.module').then(m => m.WorkflowTemplatesModule)

      }, {
        path: "charts-of-accounts",
        loadChildren: () => import('src/app/settings/components/charts-of-accounts/charts-of-accounts.module').then(m => m.ChartsOfAccountsModule)

      },
      {
        path: "journal-voucher",
        loadChildren:()=>import('src/app/settings/components/journal-voucher-transactions/journal-voucher-transaction.module').then(m=>m.JournalVoucherTransactionModule)
      },
      {
        path: "pending-approvals",
        loadChildren:()=>import('src/app/settings/components/pending-vouchers/pending-vouchers.module').then(m=>m.PendingVouchersModule)
      },
    ]
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
