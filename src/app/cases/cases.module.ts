import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasesRoutingModule } from './cases-routing.module';
import { DefaultComponent } from './components/cases/cases.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CasesComponent } from './cases.component';
import { CaseDetailsModule } from './components/case-details/case-details.module';
import { AmlComponent } from './case-details/components/children/aml/aml.component';

@NgModule({
  declarations: [CasesComponent, DefaultComponent, AmlComponent],
  imports: [
    CommonModule,
    CasesRoutingModule,
    NgbDropdownModule,
    RouterModule,
    ReactiveFormsModule,
    CaseDetailsModule,
  ],
})
export class CasesModule {}
