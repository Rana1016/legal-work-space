import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsGroupsManagementRoutingModule } from './settings-groups-management-routing.module';
import { GroupsManagementComponent } from './components/groups-management/groups-management.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    GroupsManagementComponent,
    NewGroupComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
    SettingsGroupsManagementRoutingModule
  ]
})
export class SettingsGroupsManagementModule { }
