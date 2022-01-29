import { DocumentsComponent } from './components/documents/documents.component';
import { TemplatesComponent } from './templates.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTemplateComponent } from './components/document-template/document-template.component';
const routes: Routes = [
  {
    path: "",
    redirectTo: "/documents",
    pathMatch: 'full'
  },
  {
    path:"",
    component: TemplatesComponent,
    children: [
      {
        path: "documents",
        component:DocumentsComponent
      },
      {
        path: "edit/:documentId",
        component: DocumentTemplateComponent
      },
      {
        path: "document-viewer",
        component:DocumentTemplateComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
