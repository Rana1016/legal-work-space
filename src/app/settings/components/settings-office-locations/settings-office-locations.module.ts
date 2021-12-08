import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsOfficeLocationsRoutingModule } from './settings-office-locations-routing.module';
import { OfficeLocationsComponent } from './components/office-locations/office-locations.component';
import { NewOfficeLocationComponent } from './components/new-office-location/new-office-location.component';


@NgModule({
  declarations: [
    OfficeLocationsComponent,
    NewOfficeLocationComponent
  ],
  imports: [
    CommonModule,
    SettingsOfficeLocationsRoutingModule
  ]
})
export class SettingsOfficeLocationsModule { }
