import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    TasksComponent,
    NewTaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    NgbDatepickerModule,
    NgSelectModule,
    FormsModule
  ]
})
export class TasksModule { }
