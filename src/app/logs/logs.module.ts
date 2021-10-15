import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';


@NgModule({
  declarations: [
    LogsComponent,
    AddFolderComponent,
    AddActivityComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule
  ]
})
export class LogsModule { }
