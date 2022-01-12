import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowTemplatesRoutingModule } from './workflow-templates-routing.module';
import { NewWorkflowTemplateComponent } from './components/new-workflow-template/new-workflow-template.component';
import { DataTablesModule } from 'angular-datatables';
import { WorkflowTemplatesComponent } from './workflow-templates.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { StageComponent } from './components/stage/stage.component';
import { NewStageComponent } from './components/new-stage/new-stage.component';


@NgModule({
  declarations: [
    NewWorkflowTemplateComponent,
    WorkflowTemplatesComponent,
    StageComponent,
    NewStageComponent
  ],
  imports: [
    CommonModule,
    WorkflowTemplatesRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ]
})
export class WorkflowTemplatesModule { }
