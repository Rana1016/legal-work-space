import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VatRatesRoutingModule } from './vat-rates-routing.module';
import { NewVatRateComponent } from './components/new-vat-rate/new-vat-rate.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { VatRatesComponent } from './vat-rates.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewVatRateComponent,
    VatRatesComponent
  ],
  imports: [
    CommonModule,
    VatRatesRoutingModule,
    DataTablesModule,
    NgbDropdownModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class VatRatesModule { }
