import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsUsersManagementRoutingModule } from './settings-users-management-routing.module';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    UsersManagementComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule,
    NgbDropdownModule,
    SettingsUsersManagementRoutingModule
  ]
})
export class SettingsUsersManagementModule { }
