import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseActivitiesRoutingModule } from './case-activities-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CaseActivitiesComponent } from './case-activities.component';


@NgModule({
  declarations: [
    CaseActivitiesComponent
  ],
  imports: [
    CommonModule,
    CaseActivitiesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CaseActivitiesModule { }
