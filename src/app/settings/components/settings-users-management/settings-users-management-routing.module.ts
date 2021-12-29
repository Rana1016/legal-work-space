import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent
  },
  {
    path: 'new-user',
    component: NewUserComponent
  },
  {
    path: 'edit/:userId',
    component: NewUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsUsersManagementRoutingModule { }
