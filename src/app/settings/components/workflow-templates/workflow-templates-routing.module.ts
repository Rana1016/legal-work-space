import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewStageComponent } from './components/new-stage/new-stage.component';
import { NewWorkflowTemplateComponent } from './components/new-workflow-template/new-workflow-template.component';
import { StageComponent } from './components/stage/stage.component';
import { WorkflowTemplatesComponent } from './workflow-templates.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowTemplatesComponent
  },
  {
    path: 'new-workflow',
    component: NewWorkflowTemplateComponent
  },
  {
    path: 'edit/:workflowId',
    component: NewWorkflowTemplateComponent
  },
  {
    path: 'stages/:workflowId',
    component: StageComponent
  },
  {
    path: 'stages/:workflowId/new-stage',
    component: NewStageComponent
  },
  {
    path: 'stages/:workflowId/edit/:workflowStageId',
    component: NewStageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowTemplatesRoutingModule { }
