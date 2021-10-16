import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseDetailsRoutingModule } from './case-details-routing.module';
import { CaseDetailsComponent } from './case-details.component';


@NgModule({
  declarations: [
    CaseDetailsComponent
  ],
  imports: [
    CommonModule,
    CaseDetailsRoutingModule
  ]
})
export class CaseDetailsModule { }
