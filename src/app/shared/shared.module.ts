import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LwSelectComponent } from './components/lw-select/lw-select.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LwSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LwSelectComponent
  ]
})
export class SharedModule { }
