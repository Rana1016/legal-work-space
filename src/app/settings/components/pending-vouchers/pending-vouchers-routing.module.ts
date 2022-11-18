import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingVouchersComponent } from './pending-vouchers.component';

const routes: Routes = [
  {
    path : '',
    component : PendingVouchersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingVouchersRoutingModule { }
