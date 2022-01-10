import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { ContactGroupComponent } from './contact-group.component';

const routes: Routes = [
  {
    path: '',
    component: ContactGroupComponent
  },
  {
    path: 'groups/:contactGroupId',
    component: ContactComponent
  },
  {
    path: 'groups/:contactGroupId/new-contact',
    component: NewContactComponent
  },
  {
    path: 'groups/:contactGroupId/edit/:contactId',
    component: NewContactComponent
  },
  {
    path: 'new-group',
    component: NewGroupComponent
  },
  {
    path: 'edit/:contactGroupId',
    component: NewGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
