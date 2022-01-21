import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainClassComponent } from "./components/main-class/main-class.component";
import { NewMainClassComponent } from './components/new-main-class/new-main-class.component';
import { NewSubClassComponent } from './components/new-sub-class/new-sub-class.component';
import { SubClassComponent } from "./components/sub-class/sub-class.component";
import { GeneralLedgerComponent } from "./components/general-ledger/general-ledger.component";
import { NewGeneralLedgerComponent } from "./components/new-general-ledger/new-general-ledger.component";

const routes: Routes = [
  {
    path: '',
    component: MainClassComponent
  },
  {
    path: 'new-main-class',
    component: NewMainClassComponent
  },

  {
    path: 'edit/:mainClassId',
    component: NewMainClassComponent
  },
  {
    path: 'main-class/:mainClassId',
    component: SubClassComponent
  },
  
  {
    path: 'main-class/:mainClassId/edit/:subClassId',
    component: NewSubClassComponent
  },
  {
    path: 'main-class/:mainClassId/new-subclass',
    component: NewSubClassComponent
  },
  {
    path: 'main-class/:mainClassId/generalledgers/:subClassId',
    component: GeneralLedgerComponent
  },

  {
    path: 'main-class/:mainClassId/generalledgers/:subClassId/new-generalledger',
    component: NewGeneralLedgerComponent
  },
   {
    path: 'main-class/:mainClassId/generalledgers/:subClassId/edit/:generalLedgerId',
    component: NewGeneralLedgerComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsOfAccountsRoutingModule { }
