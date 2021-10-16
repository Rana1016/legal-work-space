import { DocumentsComponent } from './components/documents/documents.component';
import { TemplatesComponent } from './templates.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
