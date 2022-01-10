import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstallmentsRoutingModule } from './installments-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { InstallmentsComponent as SubInstallmentsComponent } from './components/installments/installments.component';
import { InstallmentsComponent } from './installments.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SubInstallmentsComponent,
    InstallmentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InstallmentsRoutingModule,
    DataTablesModule
  ]
})
export class InstallmentsModule { }
