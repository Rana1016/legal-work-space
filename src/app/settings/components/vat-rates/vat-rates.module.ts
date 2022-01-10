import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VatRatesRoutingModule } from './vat-rates-routing.module';
import { NewVatRateComponent } from './components/new-vat-rate/new-vat-rate.component';


@NgModule({
  declarations: [
    NewVatRateComponent
  ],
  imports: [
    CommonModule,
    VatRatesRoutingModule
  ]
})
export class VatRatesModule { }
