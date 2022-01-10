import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { NewActivityComponent } from './components/new-activity/new-activity.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { FolderComponent } from './components/folder/folder.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    LogsComponent,
    AddFolderComponent,
    NewActivityComponent,
    FolderComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    NgbDropdownModule,
    NgSelectModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbDatepickerModule
  ]
})
export class LogsModule { }
