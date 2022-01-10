import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsHourlyRatesRoutingModule } from './settings-hourly-rates-routing.module';
import { HourlyRatesComponent } from './components/hourly-rates/hourly-rates.component';
import { NewHourlyRateComponent } from './components/new-hourly-rate/new-hourly-rate.component';
import { NewTimeKeepCategoryComponent } from './components/new-time-keep-category/new-time-keep-category.component';
import { TimeKeepCategoriesComponent } from './components/time-keep-categories/time-keep-categories.component';
import { TimeKeepSubCategoriesComponent } from './components/time-keep-sub-categories/time-keep-sub-categories.component';
import { NewTimeKeepSubCategoryComponent } from './components/new-time-keep-sub-category/new-time-keep-sub-category.component';


@NgModule({
  declarations: [
    HourlyRatesComponent,
    NewHourlyRateComponent,
    NewTimeKeepCategoryComponent,
    TimeKeepCategoriesComponent,
    TimeKeepSubCategoriesComponent,
    NewTimeKeepSubCategoryComponent
  ],
  imports: [
    CommonModule,
    SettingsHourlyRatesRoutingModule
  ]
})
export class SettingsHourlyRatesModule { }
