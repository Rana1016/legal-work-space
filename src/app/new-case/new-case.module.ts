import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { NewCaseRoutingModule } from './new-case-routing.module';
import { NewCaseComponent } from './new-case.component';
import { NgbDate, NgbDropdownModule, NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { StepsComponent } from './steps/steps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { RoundprogressModule, ROUND_PROGRESS_DEFAULTS } from 'angular-svg-round-progressbar';

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
    NgSelectModule,
    SharedModule,
    RoundprogressModule,
    FormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    TitleCasePipe,
    {
    provide: ROUND_PROGRESS_DEFAULTS,
    useValue: {
      color: '#f00',
      background: '#0f0'
    }
  }]
})
export class NewCaseModule { }
