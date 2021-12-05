import { TasksComponent } from './tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTaskComponent } from './components/new-task/new-task.component';

const routes: Routes = [
  {
    path: "",
    component:TasksComponent
  },
  {
    path: "new-task",
    component: NewTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
