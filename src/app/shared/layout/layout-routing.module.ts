import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { ClientAuthGuard } from '../guards/client-auth.guard';
import { LayoutComponent } from './layout.component';

const LayoutRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/installments',
    loadChildren: () => import('src/app/installments/installments.module').then(m => m.InstallmentsModule)
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('src/app/calendar/calendar.module').then((m) => m.CalendarModule),
  },
  {
    path: 'cases',
    loadChildren: () =>
      import('src/app/cases/cases.module').then((m) => m.CasesModule),
  },
  {
    path: 'new-case',
    loadChildren: () =>
      import('src/app/new-case/new-case.module').then(m => m.NewCaseModule)
  },
  {
    path: 'case-activities',
    loadChildren: () =>
      import('src/app/case-activities/case-activities.module').then(m => m.CaseActivitiesModule)
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('src/app/contacts/contacts.module').then((m) => m.ContactsModule),
  },
  {
    path: 'receipts',
    loadChildren: () =>
      import('src/app/receipts/receipts.module').then((m) => m.ReceiptsModule),
  },
  {
    path: 'logs',
    loadChildren: () =>
      import('src/app/logs/logs.module').then((m) => m.LogsModule),
  },
  {
    path: 'keydates',
    loadChildren: () =>
      import('src/app/keydates/keydates.module').then((m) => m.KeydatesModule),
  },
  {
    path: 'peshi-list',
    loadChildren: () =>
      import('src/app/peshi-list/peshi-list.module').then(m => m.PeshiListModule)
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('src/app/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('src/app/reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('src/app/accounts/accounts.module').then((m) => m.AccountsModule),
  },
  {
    path: 'consultations',
    loadChildren: () =>
      import('src/app/consultations/consultations.module').then(
        (m) => m.ConsultationsModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('src/app/reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('src/app/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'templates',
    loadChildren: () =>
      import('src/app/templates/templates.module').then((m) => m.TemplatesModule),
  },
  {
    path: 'client',
    canActivateChild: [ClientAuthGuard],
    loadChildren: () => import('src/app/client-portal/client-portal.module').then(m => m.ClientPortalModule)
  },
  {
    path: 'general-transaction',
    loadChildren:()=> import('src/app/general-transaction/general-transaction.module').then(m => m.GeneralTransactionModule)
  }
];

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: LayoutRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
