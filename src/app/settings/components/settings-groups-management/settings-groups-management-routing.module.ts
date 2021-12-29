import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { GroupsManagementComponent } from './components/groups-management/groups-management.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsManagementComponent
  },
  {
    path: 'new-group',
    component: NewGroupComponent
  },
  {
    path: 'edit/:groupId',
    component: NewGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsGroupsManagementRoutingModule { }
