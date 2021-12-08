import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourlyRatesComponent } from './components/hourly-rates/hourly-rates.component';
import { NewHourlyRateComponent } from './components/new-hourly-rate/new-hourly-rate.component';

const routes: Routes = [
  {
    path: '',
    component: HourlyRatesComponent
  },
  {
    path: 'new-hourly-rate',
    component: NewHourlyRateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsHourlyRatesRoutingModule { }
