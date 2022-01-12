import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class CaseCategoriesService {
  constructor(private http: HttpClient) {}
  getCaseCategories(dTParams: any) {
    return this.http.post<any>(ApiRoutes.caseCategories.all, dTParams)
  }

  addCaseCategory(data: any) {
    return this.http.post(ApiRoutes.caseCategories.add, data)
  }

  updateCaseCategory(categoryId: number, data: any) {
    return this.http.post(ApiRoutes.caseCategories.update, {...data, categoryId})
  }

  getCaseCategoryById(id: number) {
    return this.http.get(ApiRoutes.caseCategories.byId, {
      params: {
        id
      }
    })
  }

  deleteCaseCategory(id: number) {
    return this.http.delete(ApiRoutes.caseCategories.delete, {
      params: {
        id
      }
    })
  }

  getCaseSubCategories(dTParams: any) {
    return this.http.post(ApiRoutes.caseSubCategories.all, dTParams)
  }

  addCaseSubCategory(data: any) {
    return this.http.post(ApiRoutes.caseSubCategories.add, data)
  }

  updateCaseSubCategory(subCategoryId: number, data: any) {
    return this.http.post(ApiRoutes.caseSubCategories.update, {...data, subCategoryId})
  }

  getCaseSubCategoryById(id: number) {
    return this.http.get(ApiRoutes.caseSubCategories.byId, {
      params: {
        id
      }
    })
  }

  deleteCaseSubCategory(id: number) {
    return this.http.delete(ApiRoutes.caseSubCategories.delete, {
      params: {
        id
      }
    })
  }
}
