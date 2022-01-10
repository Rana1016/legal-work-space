import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsOfficeLocationsRoutingModule } from './settings-office-locations-routing.module';
import { OfficeLocationsComponent } from './components/office-locations/office-locations.component';
import { NewOfficeLocationComponent } from './components/new-office-location/new-office-location.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    OfficeLocationsComponent,
    NewOfficeLocationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    DataTablesModule,
    ReactiveFormsModule,
    SettingsOfficeLocationsRoutingModule
  ]
})
export class SettingsOfficeLocationsModule { }
