import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class TimeKeepCategoriesService {
  constructor (private http: HttpClient) {}
  getTimeKeepCategories(dTParams: any) {
    return this.http.post<any>(ApiRoutes.timeKeepCategories.all, dTParams)
  }

  addTimeKeepCategory(data: any) {
    return this.http.post(ApiRoutes.timeKeepCategories.add, data)
  }

  updateTimeKeepCategory(hourlyRateId: number, data: any) {
    return this.http.post(ApiRoutes.timeKeepCategories.update, {...data, hourlyRateId})
  }

  getTimeKeepCategoryById(id: number) {
    return this.http.get(ApiRoutes.timeKeepCategories.byId, {
      params: {
        id
      }
    })
  }

  deleteTimeKeepCategory(id: number) {
    return this.http.delete(ApiRoutes.timeKeepCategories.delete, {
      params: {
        id
      }
    })
  }

  getTimeKeepSubCategories(hourlyRateId: number, dTParams: any) {
    return this.http.post<any>(ApiRoutes.timeKeepSubCategories.all, dTParams, {
      params: {
        hourlyRateId
      }
    })
  }

  getTimeKeepSubCategoriesByCategoryId(dTParams: any) {
    return this.http.post<any>(ApiRoutes.timeKeepCategories.all, dTParams)
  }

  addTimeKeepSubCategory(data: any) {
    return this.http.post(ApiRoutes.timeKeepSubCategories.add, data)
  }

  updateTimeKeepSubCategory(hourlyRateDetailId: number, data: any) {
    return this.http.post(ApiRoutes.timeKeepSubCategories.update, {...data, hourlyRateDetailId})
  }

  getTimeKeepSubCategoryById(id: number) {
    return this.http.get(ApiRoutes.timeKeepSubCategories.byId, {
      params: {
        id
      }
    })
  }

  deleteTimeKeepSubCategory(id: number) {
    return this.http.delete(ApiRoutes.timeKeepSubCategories.delete, {
      params: {
        id
      }
    })
  }
}
