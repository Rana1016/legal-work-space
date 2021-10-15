import { LogsComponent } from './logs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';


const routes: Routes = [
  {
    path: "",
    component:LogsComponent
  },
  {
    path: 'add-folder',
    component: AddFolderComponent
  },
  {
    path: 'add-activity',
    component: AddActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
