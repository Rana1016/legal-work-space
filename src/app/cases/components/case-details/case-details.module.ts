import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseDetailsRoutingModule } from './case-details-routing.module';
import { CaseDetailsComponent as ParentComponent } from './case-details.component';
import { DocumentsComponent } from './children/documents/documents.component';
import { NotesComponent } from './children/notes/notes.component';
import { WorkflowComponent } from './children/workflow/workflow.component';
import { ActivitiesComponent } from './children/activities/activities.component';
import { StatusComponent } from './children/status/status.component';
import { AmlComponent } from './children/aml/aml.component';
import { RouterModule } from '@angular/router';
import { PeshiListComponent } from './children/peshi-list/peshi-list.component';
import { DeadLinesComponent } from './children/dead-lines/dead-lines.component';
import { AttendanceNotesComponent } from './children/attendance-notes/attendance-notes.component';
import { PersonalDetailsComponent } from './children/personal-details/personal-details.component';
import { AccountDetailsComponent } from './children/account-details/account-details.component';
import { TimeKeepingComponent } from './children/time-keeping/time-keeping.component';
import { CaseDetailsComponent } from './children/case-details/case-details.component';


@NgModule({
  declarations: [
    ParentComponent,
    CaseDetailsComponent,
    DocumentsComponent,
    NotesComponent,
    WorkflowComponent,
    ActivitiesComponent,
    StatusComponent,
    AmlComponent,
    PeshiListComponent,
    DeadLinesComponent,
    AttendanceNotesComponent,
    PersonalDetailsComponent,
    AccountDetailsComponent,
    TimeKeepingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CaseDetailsRoutingModule
  ]
})
export class CaseDetailsModule { }
