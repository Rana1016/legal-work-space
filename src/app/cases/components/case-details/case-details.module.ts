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
import { PersonalDetailsComponent } from './children/personal-details/personal-details.component';
import { AccountDetailsComponent } from './children/account-details/account-details.component';
import { TimeKeepingComponent } from './children/time-keeping/time-keeping.component';
import { CaseDetailsComponent } from './children/case-details/case-details.component';
import { NgbAccordionModule, NgbDatepickerModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NewAmlListComponent } from './children/new-aml-list/new-aml-list.component';
import { NewNoteComponent } from './children/new-note/new-note.component';
import { EditPersonalDetailsComponent } from './children/edit-personal-details/edit-personal-details.component';
import { EditCaseDetailsComponent } from './children/edit-case-details/edit-case-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


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
    PersonalDetailsComponent,
    AccountDetailsComponent,
    ActivitiesComponent,
    TimeKeepingComponent,
    NewAmlListComponent,
    NewNoteComponent,
    EditPersonalDetailsComponent,
    EditCaseDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    ReactiveFormsModule,
    CaseDetailsRoutingModule,
    NgbDropdownModule,
    NgSelectModule,
    NgbAccordionModule,
    NgbDatepickerModule,
    NgbModalModule,
    SharedModule,
    FormsModule
  ]
})
export class CaseDetailsModule { }
