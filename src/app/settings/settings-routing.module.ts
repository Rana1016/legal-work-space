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
        component: AreasOfPracticeComponent
    
      },
      {
        path: "bank-accounts",
        loadChildren: () => import('./components/settings-bank-accounts/settings-bank-accounts.module').then(m => m.SettingsBankAccountsModule)
      },
      {
        path:"calendar",
        component:CalendarComponent
    
      },
      {
        path:"contacts",
        component:ContactsComponent
    
      },
      {
        path:"global-settings",
        component:GlobalSettingsComponent
    
      },
      {
        path:"hourly-rates",
        loadChildren: () => import('./components/settings-hourly-rates/settings-hourly-rates.module').then(m => m.SettingsHourlyRatesModule)
    
      },
      {
        path:"office-locations",
        loadChildren: () => import('./components/settings-office-locations/settings-office-locations.module').then(m => m.SettingsOfficeLocationsModule)
      },
      {
        path:"quiz",
        component:QuizComponent
    
      },{
        path:"time-activity-codes",
        component:TimeActivityCodesComponent
    
      },
      {
        path:"user-management",
        loadChildren: () => import('./components/settings-users-management/settings-users-management.module').then(m => m.SettingsUsersManagementModule)
    
      },{
        path:"vat-rates",
        component:VatRatesComponent
    
      },{
        path:"workflow-templates",
        component:WorkflowTemplatesComponent
    
      },  
    ]
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
