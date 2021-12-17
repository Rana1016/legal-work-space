import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPeshiComponent } from './components/new-peshi/new-peshi.component';
import { PeshisComponent } from './components/peshis/peshis.component';

const routes: Routes = [
  {
    path: '',
    component: PeshisComponent
  },
  {
    path: 'new-peshi',
    component: NewPeshiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeshiListRoutingModule { }
