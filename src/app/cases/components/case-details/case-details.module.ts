import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseDetailsRoutingModule } from './case-details-routing.module';
import { CaseDetailsComponent } from './case-details.component';
import { ProfileComponent } from './children/profile/profile.component';
import { DetailsComponent } from './children/details/details.component';
import { AccountsComponent } from './children/accounts/accounts.component';
import { TimeComponent } from './children/time/time.component';
import { DocumentsComponent } from './children/documents/documents.component';
import { NotesComponent } from './children/notes/notes.component';
import { AttendanceComponent } from './children/attendance/attendance.component';
import { DeadlinesComponent } from './children/deadlines/deadlines.component';
import { WorkflowComponent } from './children/workflow/workflow.component';
import { ActivitiesComponent } from './children/activities/activities.component';
import { StatusComponent } from './children/status/status.component';
import { AmlComponent } from './children/aml/aml.component';


@NgModule({
  declarations: [
    CaseDetailsComponent,
    ProfileComponent,
    DetailsComponent,
    AccountsComponent,
    TimeComponent,
    DocumentsComponent,
    NotesComponent,
    AttendanceComponent,
    DeadlinesComponent,
    WorkflowComponent,
    ActivitiesComponent,
    StatusComponent,
    AmlComponent
  ],
  imports: [
    CommonModule,
    CaseDetailsRoutingModule
  ]
})
export class CaseDetailsModule { }
