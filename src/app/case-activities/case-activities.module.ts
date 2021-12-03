import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseActivitiesRoutingModule } from './case-activities-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CaseActivitiesComponent } from './case-activities.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CaseActivitiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CaseActivitiesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CaseActivitiesModule { }
