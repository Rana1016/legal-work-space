import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { AreasOfPracticeComponent } from './components/areas-of-practice/areas-of-practice.component';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { HourlyRatesComponent } from './components/hourly-rates/hourly-rates.component';
import { OfficeLocationsComponent } from './components/office-locations/office-locations.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { TimeActivityCodesComponent } from './components/time-activity-codes/time-activity-codes.component';
import { UserManangementComponent } from './components/user-manangement/user-manangement.component';
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
        path:"areas-of-practice",
        component:AreasOfPracticeComponent
    
      },
      {
        path:"bank-accounts",
        component:BankAccountsComponent
    
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
        component:HourlyRatesComponent
    
      },
      {
        path:"office-locations",
        component:OfficeLocationsComponent
    
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
        component:UserManangementComponent
    
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
