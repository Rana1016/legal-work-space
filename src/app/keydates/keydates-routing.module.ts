import { KeydatesComponent } from './components/keydates/keydates.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewKeydateComponent } from './components/new-keydate/new-keydate.component';

const routes: Routes = [
  {
    path: "",
    component: KeydatesComponent
  },
  {
    path: "new-keydate",
    component: NewKeydateComponent
  },
  {
    path: "edit/:keyDateId",
    component: NewKeydateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeydatesRoutingModule { }
