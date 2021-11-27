import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';


import { CasesModule } from 'src/app/cases/cases.module';
import { CalendarModule } from 'src/app/calendar/calendar.module';
import { TasksModule } from 'src/app/tasks/tasks.module';
import { KeydatesModule } from 'src/app/keydates/keydates.module';
import { ContactsModule } from 'src/app/contacts/contacts.module';
import { ReceiptsModule } from 'src/app/receipts/receipts.module';
import { AccountsModule } from 'src/app/accounts/accounts.module';
import { LogsModule } from 'src/app/logs/logs.module';
import { ReportsModule } from 'src/app/reports/reports.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FloatingTimerComponent } from '../components/floating-timer/floating-timer.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidenavComponent,
    FloatingTimerComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CasesModule,
    CalendarModule,
    TasksModule,
    KeydatesModule,
    ContactsModule,
    ReceiptsModule,
    AccountsModule,
    LogsModule,
    ReportsModule,
    NgbDropdownModule,
    NgbDatepickerModule
  ]
})
export class LayoutModule { }
