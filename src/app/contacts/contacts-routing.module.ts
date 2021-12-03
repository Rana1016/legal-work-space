import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CivilCaseGroupComponent } from './components/civil-case-group/civil-case-group.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { ContactsComponent } from './contacts.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  },
  {
    path: 'groups/:id',
    component: CivilCaseGroupComponent
  },
  {
    path: 'groups/:id/new-contact',
    component: NewContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
