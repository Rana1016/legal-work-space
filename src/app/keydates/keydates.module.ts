import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeydatesRoutingModule } from './keydates-routing.module';
import { KeydatesComponent } from './keydates.component';


@NgModule({
  declarations: [
    KeydatesComponent
  ],
  imports: [
    CommonModule,
    KeydatesRoutingModule
  ]
})
export class KeydatesModule { }
