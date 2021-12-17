import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeydatesRoutingModule } from './keydates-routing.module';
import { KeydatesComponent } from './keydates.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    KeydatesComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    KeydatesRoutingModule
  ]
})
export class KeydatesModule { }
