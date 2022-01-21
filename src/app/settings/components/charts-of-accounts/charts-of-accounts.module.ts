import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsOfAccountsRoutingModule} from "./charts-of-accounts-routing.module";
import { MainClassComponent } from './components/main-class/main-class.component';
import { NewMainClassComponent } from './components/new-main-class/new-main-class.component';
import { SubClassComponent } from './components/sub-class/sub-class.component';
import { NewSubClassComponent } from './components/new-sub-class/new-sub-class.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsOfAccountsComponent } from "./charts-of-accounts.component";
import { GeneralLedgerComponent } from './components/general-ledger/general-ledger.component';
import { NewGeneralLedgerComponent } from './components/new-general-ledger/new-general-ledger.component';


@NgModule({
  declarations: [
    ChartsOfAccountsComponent,
    MainClassComponent,
    SubClassComponent,
    NewMainClassComponent,
    NewSubClassComponent,
    GeneralLedgerComponent,
    NewGeneralLedgerComponent,
  ],
  imports: [
    CommonModule,
    ChartsOfAccountsRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    RouterModule,
    NgbDropdownModule
  ]
})
export class ChartsOfAccountsModule { }
