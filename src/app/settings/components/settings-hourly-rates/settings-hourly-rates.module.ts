import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsHourlyRatesRoutingModule } from './settings-hourly-rates-routing.module';
import { HourlyRatesComponent } from './components/hourly-rates/hourly-rates.component';
import { NewHourlyRateComponent } from './components/new-hourly-rate/new-hourly-rate.component';


@NgModule({
  declarations: [
    HourlyRatesComponent,
    NewHourlyRateComponent
  ],
  imports: [
    CommonModule,
    SettingsHourlyRatesRoutingModule
  ]
})
export class SettingsHourlyRatesModule { }
