import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactGroupComponent } from './components/contact-group/contact-group.component';
import { NewGroupComponent } from './components/new-group/new-group.component';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactGroupComponent,
    NewContactComponent,
    NewGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactsRoutingModule,
    NgbDropdownModule
  ]
})
export class ContactsModule { }
