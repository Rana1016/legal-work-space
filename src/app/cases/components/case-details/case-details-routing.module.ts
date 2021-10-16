import { StatusComponent } from './children/status/status.component';
import { ActivitiesComponent } from './children/activities/activities.component';
import { AmlComponent } from './children/aml/aml.component';

import { CaseDetailsComponent } from './case-details.component';
import { WorkflowComponent } from './children/workflow/workflow.component';
import { KeydatesComponent } from './../../../keydates/keydates.component';
import { AttendanceComponent } from './children/attendance/attendance.component';
import { NotesComponent } from './children/notes/notes.component';
import { DocumentsComponent } from './children/documents/documents.component';
import { TimeComponent } from './children/time/time.component';
import { AccountsComponent } from './../../../accounts/accounts.component';
import { DetailsComponent } from './children/details/details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './children/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: "full",
  },
  {
    path: '',
    component: CaseDetailsComponent,
    children: [

      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'details',
        component: DetailsComponent
      },
      {
        path: 'accounts',
        component: AccountsComponent
      },
      {
        path: 'time',
        component: TimeComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path: 'attd',
        component: AttendanceComponent
      },
      {
        path: 'deadlines',
        component: KeydatesComponent
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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseDetailsRoutingModule { }
