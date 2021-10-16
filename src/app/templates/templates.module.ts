import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { DocumentsComponent } from './components/documents/documents.component';
import { TemplatesComponent } from './templates.component';


@NgModule({
  declarations: [
    DocumentsComponent,
    TemplatesComponent
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule
  ]
})
export class TemplatesModule { }
