import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCaseComponent } from './new-case.component';
import { StepsComponent } from './steps/steps.component';

const routes: Routes = [
  {
    path: '',
    component: NewCaseComponent
  },
  {
    path: 'steps',
    component: StepsComponent
  },
  {
    path: 'steps/temp',
    component: StepsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCaseRoutingModule { }
