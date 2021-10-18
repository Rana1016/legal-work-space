import { NgbModule, NgbDatepickerModule,NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { StepsComponent } from './steps.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [StepsComponent],
  imports: [
    CommonModule, BrowserModule,
    NgbModule,NgbDate
  ],
  exports: [StepsComponent],
  bootstrap: [StepsComponent]
})
export class StepsModule { }
