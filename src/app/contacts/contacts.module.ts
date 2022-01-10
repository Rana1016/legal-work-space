import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactGroupComponent } from './contact-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './components/contact/contact.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ContactGroupComponent,
    ContactComponent,
    NewContactComponent,
    NewGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactsRoutingModule,
    NgbDropdownModule,
    DataTablesModule
  ]
})
export class ContactsModule { }
