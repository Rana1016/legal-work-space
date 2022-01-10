import { LogsComponent } from './logs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { NewActivityComponent } from './components/new-activity/new-activity.component';
import { FolderComponent } from './components/folder/folder.component';


const routes: Routes = [
  {
    path: "",
    component:LogsComponent
  },
  {
    path: 'edit/:logBookFolderId',
    component: AddFolderComponent
  },
  {
    path: 'add-folder',
    component: AddFolderComponent
  },
  {
    path: 'folder/:logBookFolderId',
    component: FolderComponent
  },
  {
    path: 'folder/:logBookFolderId/new-log',
    component: NewActivityComponent
  },
  {
    path: 'folder/:logBookFolderId/edit/:logId',
    component: NewActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
