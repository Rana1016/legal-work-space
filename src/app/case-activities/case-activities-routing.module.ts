import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseActivitiesComponent } from './case-activities.component';

const routes: Routes = [
  {
    path: '',
    component: CaseActivitiesComponent
  },
  {
    path: ':date',
    component: CaseActivitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseActivitiesRoutingModule { }
