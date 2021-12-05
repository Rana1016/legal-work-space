import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactGroupComponent } from './components/contact-group/contact-group.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { ContactsComponent } from './contacts.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  },
  {
    path: 'groups/:id',
    component: ContactGroupComponent
  },
  {
    path: 'groups/:id/new-contact',
    component: NewContactComponent
  },
  {
    path: 'new-group',
    component: NewGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
