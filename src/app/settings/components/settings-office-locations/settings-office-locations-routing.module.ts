import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOfficeLocationComponent } from './components/new-office-location/new-office-location.component';
import { OfficeLocationsComponent } from './components/office-locations/office-locations.component';

const routes: Routes = [
  {
    path: '',
    component: OfficeLocationsComponent
  },
  {
    path: 'new-office-location',
    component: NewOfficeLocationComponent
  },
  {
    path: 'edit/:locationId',
    component: NewOfficeLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsOfficeLocationsRoutingModule { }
