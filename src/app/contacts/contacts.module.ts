import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CivilCaseGroupComponent } from './components/civil-case-group/civil-case-group.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ContactsComponent,
    CivilCaseGroupComponent,
    NewContactComponent
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
