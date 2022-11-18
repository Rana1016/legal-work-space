import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingVouchersComponent } from './pending-vouchers.component'
import { PendingVouchersRoutingModule } from './pending-vouchers-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PendingVouchersComponent],
  imports: [
    CommonModule,
    PendingVouchersRoutingModule,
    DataTablesModule,
    NgbDropdownModule
  ]
})
export class PendingVouchersModule { }
