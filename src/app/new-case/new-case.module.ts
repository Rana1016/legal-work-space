import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewCaseRoutingModule } from './new-case-routing.module';
import { NewCaseComponent } from './new-case.component';
import { NgbDate, NgbDropdownModule, NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { StepsComponent } from './steps/steps.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewCaseStepsService } from '../shared/services/new-case-steps.service';

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
    ReactiveFormsModule,
  ]
})
export class NewCaseModule { }
