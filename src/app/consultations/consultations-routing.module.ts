import { ConsultationsComponent } from './consultations.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewConsultationComponent } from './components/new-consultation/new-consultation.component';

const routes: Routes = [
  {
    path: "",
    component: ConsultationsComponent
  },
  {
    path: "new-consultation",
    component: NewConsultationComponent
  },
  {
    path: "edit/:consultationId",
    component: NewConsultationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationsRoutingModule { }
