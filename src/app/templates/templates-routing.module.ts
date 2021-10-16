import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from '../cases/components/case-details/children/documents/documents.component';

const routes: Routes = [
  {
    path:"documents",
    component:DocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
