import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsHourlyRatesRoutingModule } from './settings-hourly-rates-routing.module';
import { NewTimeKeepCategoryComponent } from './components/new-time-keep-category/new-time-keep-category.component';
import { TimeKeepCategoriesComponent } from './components/time-keep-categories/time-keep-categories.component';
import { TimeKeepSubCategoriesComponent } from './components/time-keep-sub-categories/time-keep-sub-categories.component';
import { NewTimeKeepSubCategoryComponent } from './components/new-time-keep-sub-category/new-time-keep-sub-category.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewTimeKeepCategoryComponent,
    TimeKeepCategoriesComponent,
    TimeKeepSubCategoriesComponent,
    NewTimeKeepSubCategoryComponent
  ],
  imports: [
    CommonModule,
    SettingsHourlyRatesRoutingModule,
    DataTablesModule,
    NgbDropdownModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SettingsHourlyRatesModule { }
