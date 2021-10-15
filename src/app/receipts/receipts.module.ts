import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptsRoutingModule } from './receipts-routing.module';
import { ReceiptsComponent } from './receipts.component';


@NgModule({
  declarations: [
    ReceiptsComponent
  ],
  imports: [
    CommonModule,
    ReceiptsRoutingModule
  ]
})
export class ReceiptsModule { }
