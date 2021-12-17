import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LwSelectComponent } from './components/lw-select/lw-select.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { FloatingTimerComponent } from './components/floating-timer/floating-timer.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [LwSelectComponent, FloatingTimerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [
    LwSelectComponent,
    FloatingTimerComponent
  ]
})
export class SharedModule { }
