import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { MyCasesComponent } from './components/my-cases/my-cases.component';
import { MyDocumentsComponent } from './components/my-documents/my-documents.component';
import { PortalComponent } from './components/portal/portal.component';

const routes: Routes = [
  {
    path: 'my-cases',
    component: MyCasesComponent
  },
  {
    path: 'my-documents',
    component: MyDocumentsComponent
  },
  {
    path: 'invoices',
    component: InvoicesComponent
  },
  {
    path: '',
    redirectTo:"my-cases",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPortalRoutingModule { }
