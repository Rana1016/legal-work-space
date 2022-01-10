import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasOfPracticeRoutingModule } from './areas-of-practice-routing.module';
import { CaseCategoriesComponent } from './components/case-categories/case-categories.component';
import { NewCaseCategoryComponent } from './components/new-case-category/new-case-category.component';
import { CaseSubCategoriesComponent } from './components/case-sub-categories/case-sub-categories.component';
import { NewCaseSubCategoryComponent } from './components/new-case-sub-category/new-case-sub-category.component';


@NgModule({
  declarations: [
  
    CaseCategoriesComponent,
       NewCaseCategoryComponent,
       CaseSubCategoriesComponent,
       NewCaseSubCategoryComponent
  ],
  imports: [
    CommonModule,
    AreasOfPracticeRoutingModule
  ]
})
export class AreasOfPracticeModule { }
