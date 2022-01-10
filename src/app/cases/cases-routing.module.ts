import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './components/cases/cases.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
  },
  {
    path: ':status',
    component: DefaultComponent,
  },
  {
    path: 'case-details/:caseRef',
    loadChildren: () => import('./components/case-details/case-details.module').then(m => m.CaseDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }
