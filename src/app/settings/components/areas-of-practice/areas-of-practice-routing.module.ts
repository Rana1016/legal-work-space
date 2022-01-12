import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseCategoriesComponent } from './components/case-categories/case-categories.component';
import { CaseSubCategoriesComponent } from './components/case-sub-categories/case-sub-categories.component';
import { NewCaseCategoryComponent } from './components/new-case-category/new-case-category.component';
import { NewCaseSubCategoryComponent } from './components/new-case-sub-category/new-case-sub-category.component';

const routes: Routes = [
  {
    path: '',
    component: CaseCategoriesComponent
  },
  {
    path: 'new-category',
    component: NewCaseCategoryComponent
  },
  {
    path: 'edit/:categoryId',
    component: NewCaseCategoryComponent
  },
  {
    path: 'category/:categoryId',
    component: CaseSubCategoriesComponent
  },
  {
    path: 'category/:categoryId/new-subcategory',
    component: NewCaseSubCategoryComponent
  },
  {
    path: 'category/:categoryId/edit/:subCategoryId',
    component: NewCaseSubCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasOfPracticeRoutingModule { }
