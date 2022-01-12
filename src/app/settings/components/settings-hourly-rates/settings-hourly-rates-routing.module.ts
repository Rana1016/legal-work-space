import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTimeKeepCategoryComponent } from './components/new-time-keep-category/new-time-keep-category.component';
import { NewTimeKeepSubCategoryComponent } from './components/new-time-keep-sub-category/new-time-keep-sub-category.component';
import { TimeKeepCategoriesComponent } from './components/time-keep-categories/time-keep-categories.component';
import { TimeKeepSubCategoriesComponent } from './components/time-keep-sub-categories/time-keep-sub-categories.component';

const routes: Routes = [
  {
    path: '',
    component: TimeKeepCategoriesComponent
  },
  {
    path: 'new-hourly-rate',
    component: NewTimeKeepCategoryComponent
  },
  {
    path: 'edit/:hourlyRateId',
    component: NewTimeKeepCategoryComponent
  },
  {
    path: 'hourly-rate/:hourlyRateId',
    component: TimeKeepSubCategoriesComponent
  },
  {
    path: 'hourly-rate/:hourlyRateId/new-hourly-rate-detail',
    component: NewTimeKeepSubCategoryComponent
  },
  {
    path: 'hourly-rate/:hourlyRateId/edit/:hourlyRateDetailId',
    component: NewTimeKeepSubCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsHourlyRatesRoutingModule { }
