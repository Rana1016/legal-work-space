import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPortalRoutingModule } from './client-portal-routing.module';
import { PortalComponent } from './components/portal/portal.component';
import { MyCasesComponent } from './components/my-cases/my-cases.component';
import { MyDocumentsComponent } from './components/my-documents/my-documents.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientPortalComponent } from './client-portal.component';
import { DataTablesModule } from 'angular-datatables';
import {RouterModule} from '@angular/router';
import { InvoicesComponent } from './components/invoices/invoices.component';

@NgModule({
  declarations: [
    ClientPortalComponent,
    PortalComponent,
    MyCasesComponent,
    MyDocumentsComponent,
    InvoicesComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ClientPortalRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule
  ]
})
export class ClientPortalModule { }
