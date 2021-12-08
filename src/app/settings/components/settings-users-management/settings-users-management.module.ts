import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsUsersManagementRoutingModule } from './settings-users-management-routing.module';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { NewUserComponent } from './components/new-user/new-user.component';


@NgModule({
  declarations: [
    UsersManagementComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    SettingsUsersManagementRoutingModule
  ]
})
export class SettingsUsersManagementModule { }
