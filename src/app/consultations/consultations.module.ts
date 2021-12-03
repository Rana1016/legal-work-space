import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationsRoutingModule } from './consultations-routing.module';
import { NewConsultationComponent } from './components/new-consultation/new-consultation.component';
import { ConsultationsComponent } from './consultations.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ConsultationsComponent,
    NewConsultationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ConsultationsRoutingModule,
    NgbDropdownModule,
    NgbDatepickerModule
  ]
})
export class ConsultationsModule { }
