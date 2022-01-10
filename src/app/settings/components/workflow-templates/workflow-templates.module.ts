import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowTemplatesRoutingModule } from './workflow-templates-routing.module';
import { NewWorkflowTemplateComponent } from './components/new-workflow-template/new-workflow-template.component';


@NgModule({
  declarations: [
    NewWorkflowTemplateComponent
  ],
  imports: [
    CommonModule,
    WorkflowTemplatesRoutingModule
  ]
})
export class WorkflowTemplatesModule { }
