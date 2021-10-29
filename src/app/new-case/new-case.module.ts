import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewCaseRoutingModule } from './new-case-routing.module';
import { NewCaseComponent } from './new-case.component';
import { NgbDate, NgbDropdownModule, NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { StepsComponent } from './steps/steps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewCaseStepsService } from '../shared/services/new-case-steps.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    NewCaseComponent,
    StepsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NewCaseRoutingModule,
    NgbDropdownModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class NewCaseModule { }
