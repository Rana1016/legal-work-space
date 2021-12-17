import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasesRoutingModule } from './cases-routing.module';
import { DefaultComponent } from './components/cases/cases.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CasesComponent } from './cases.component';
import { CaseDetailsModule } from './components/case-details/case-details.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [CasesComponent, DefaultComponent,],
  imports: [
    CommonModule,
    CasesRoutingModule,
    NgbDropdownModule,
    RouterModule,
    ReactiveFormsModule,
    CaseDetailsModule,
    DataTablesModule
  ],
})
export class CasesModule {}
