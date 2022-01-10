import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeydatesRoutingModule } from './keydates-routing.module';
import { KeydatesComponent } from './keydates.component';
import { DataTablesModule } from 'angular-datatables';
import { KeydatesComponent as KeydatesChildComponent } from './components/keydates/keydates.component';
import { NewKeydateComponent } from './components/new-keydate/new-keydate.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    KeydatesComponent,
    KeydatesChildComponent,
    NewKeydateComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    KeydatesRoutingModule,
    NgbDropdownModule
  ]
})
export class KeydatesModule { }
