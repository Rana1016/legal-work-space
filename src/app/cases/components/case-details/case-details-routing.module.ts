import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CaseDetailsComponent as ParentComponent } from './case-details.component'
import { CaseDetailsComponent } from './children/case-details/case-details.component';
import { StatusComponent } from './children/status/status.component';
import { ActivitiesComponent } from './children/activities/activities.component';
import { AmlComponent } from './children/aml/aml.component';
import { WorkflowComponent } from './children/workflow/workflow.component';
import { NotesComponent } from './children/notes/notes.component';
import { DocumentsComponent } from './children/documents/documents.component';
import { PersonalDetailsComponent } from './children/personal-details/personal-details.component';
import { AccountDetailsComponent } from './children/account-details/account-details.component';
import { TimeKeepingComponent } from './children/time-keeping/time-keeping.component';
import { PeshiListComponent } from './children/peshi-list/peshi-list.component';
import { DeadLinesComponent } from './children/dead-lines/dead-lines.component';
import { NewPeshiComponent } from './children/new-peshi/new-peshi.component';
import { NewAmlListComponent } from './children/new-aml-list/new-aml-list.component';
import { NewNoteComponent } from './children/new-note/new-note.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'personal-details',
    pathMatch: "full",
  },
  {
    path: '',
    component: ParentComponent,
    children: [
      {
        path: 'personal-details',
        component: PersonalDetailsComponent
      },
      {
        path: 'case-details',
        component: CaseDetailsComponent
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent
      },
      {
        path: 'time-keeping',
        component: TimeKeepingComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'peshi-list',
        component: PeshiListComponent
      },
      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path: 'deadlines',
        component: DeadLinesComponent
      },
      {
        path: 'workflow',
        component: WorkflowComponent
      },
      {
        path: 'aml',
        component: AmlComponent
      },
      {
        path: 'activities',
        component: ActivitiesComponent
      },
      {
        path: 'status',
        component: StatusComponent
      },
    ]
  },
  {
    path: 'peshi-list/new-peshi',
    component: NewPeshiComponent
  },
  {
    path: 'aml/new-aml-list',
    component: NewAmlListComponent
  },
  {
    path: 'notes/new-note',
    component: NewNoteComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseDetailsRoutingModule { }
