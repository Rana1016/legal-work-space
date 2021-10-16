import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { OfficeLocationsComponent } from './components/office-locations/office-locations.component';
import { UserManangementComponent } from './components/user-manangement/user-manangement.component';
import { AreasOfPracticeComponent } from './components/areas-of-practice/areas-of-practice.component';
import { WorkflowTemplatesComponent } from './components/workflow-templates/workflow-templates.component';
import { HourlyRatesComponent } from './components/hourly-rates/hourly-rates.component';
import { TimeActivityCodesComponent } from './components/time-activity-codes/time-activity-codes.component';
import { VatRatesComponent } from './components/vat-rates/vat-rates.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ContactsComponent } from './components/contacts/contacts.component';


@NgModule({
  declarations: [
    SettingsComponent,
    CalendarComponent,
    GlobalSettingsComponent,
    BankAccountsComponent,
    OfficeLocationsComponent,
    UserManangementComponent,
    AreasOfPracticeComponent,
    WorkflowTemplatesComponent,
    HourlyRatesComponent,
    TimeActivityCodesComponent,
    VatRatesComponent,
    QuizComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
