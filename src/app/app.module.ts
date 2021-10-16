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
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewCaseModule } from './new-case/new-case.module';
import { CaseActivitiesModule } from './case-activities/case-activities.module';
import { RouterModule } from '@angular/router';
import { SettingsModule } from './settings/settings.module';
import { TemplatesModule } from './templates/templates.module';

@NgModule({
  declarations: [AppComponent, ConsultationsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    FontAwesomeModule,
    LayoutModule,
    AuthModule,
    ConsultationsModule,
    HighchartsChartModule,
    NgbModule,
    NgbDropdownModule,
    NewCaseModule,
    CaseActivitiesModule,
    RouterModule,
    SettingsModule,
    TemplatesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
