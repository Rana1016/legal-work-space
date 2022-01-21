import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutModule } from './shared/layout/layout.module';
import { AuthModule } from './shared/auth/auth.module';
import { ConsultationsComponent } from './consultations/consultations.component';
import { ConsultationsModule } from './consultations/consultations.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewCaseModule } from './new-case/new-case.module';
import { CaseActivitiesModule } from './case-activities/case-activities.module';
import { RouterModule } from '@angular/router';
import { SettingsModule } from './settings/settings.module';
import { TemplatesModule } from './templates/templates.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select'; import { CasesService } from './shared/services/cases.service';
import { DashedNgbDateAdapter, DashedNgbDateParserFormatter } from './shared/services/ngb-date.service';
import { PeshiListComponent } from './peshi-list/peshi-list.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { InstallmentsComponent } from './installments/installments.component';
import { GeneralTransactionComponent } from './general-transaction/general-transaction.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, ChangePasswordComponent, GeneralTransactionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    FontAwesomeModule,
    LayoutModule,
    ReactiveFormsModule,
    AuthModule,
    ConsultationsModule,
    HighchartsChartModule,
    NgbModule,
    HttpClientModule,
    NgbDropdownModule,
    NewCaseModule,
    CaseActivitiesModule,
    RouterModule,
    SettingsModule,
    TemplatesModule,
    NgSelectModule
  ],
  providers: [
    CasesService,
    {
      provide: NgbDateParserFormatter, useClass: DashedNgbDateParserFormatter
    },
    {
      provide: NgbDateAdapter, useClass: DashedNgbDateAdapter
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
