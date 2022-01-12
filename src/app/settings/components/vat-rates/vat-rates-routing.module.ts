import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewVatRateComponent } from './components/new-vat-rate/new-vat-rate.component';
import { VatRatesComponent } from './vat-rates.component';

const routes: Routes = [
  {
    path: '',
    component: VatRatesComponent
  },
  {
    path: 'new-vat-rate',
    component: NewVatRateComponent
  },
  {
    path: 'edit/:vatRateId',
    component: NewVatRateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VatRatesRoutingModule { }
