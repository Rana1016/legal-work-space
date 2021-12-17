import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeshiListRoutingModule } from './peshi-list-routing.module';
import { NewPeshiComponent } from './components/new-peshi/new-peshi.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PeshisComponent } from './components/peshis/peshis.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    NewPeshiComponent,
    PeshisComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    AgGridModule.withComponents([]),
    PeshiListRoutingModule
  ]
})
export class PeshiListModule { }
