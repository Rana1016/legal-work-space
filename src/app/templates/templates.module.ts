import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { DocumentsComponent } from './components/documents/documents.component';
import { TemplatesComponent } from './templates.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DocumentTemplateComponent } from './components/document-template/document-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DocumentsComponent,
    TemplatesComponent,
    DocumentTemplateComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    ReactiveFormsModule,
    TemplatesRoutingModule,
    DataTablesModule,
    NgbDropdownModule
  ]
})
export class TemplatesModule { }
