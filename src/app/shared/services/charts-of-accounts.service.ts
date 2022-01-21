import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class ChartsOfAccountsService {
  constructor(private http: HttpClient) {}
  getMainClasses(dTParams: any) {
    return this.http.post<any>(ApiRoutes.mainClass.all, dTParams)
  }

  addNewMainClass(data: any) {
    return this.http.post(ApiRoutes.mainClass.add, data)
  }

  updateMainClass(mainClassId: number, data: any) {
    return this.http.post(ApiRoutes.mainClass.update, {...data, mainClassId})
  }

  getCaseCategoryById(id: number) {
    return this.http.get(ApiRoutes.mainClass.byId, {
      params: {
        id
      }
    })
  }

  deleteCaseCategory(id: number) {
    return this.http.delete(ApiRoutes.mainClass.delete, {
      params: {
        id
      }
    })
  }

  getSubClassesByMainClassId(dTParams: any, mainClassId: any) {
    return this.http.post<any>(`${ApiRoutes.subClass.byMainClassId}/${mainClassId}`, dTParams)
  }
  getSubClassById(id: number) {
    return this.http.get(ApiRoutes.subClass.byId, {
      params: {
        id
      }
    })
  }

  addNewSubClass(data: any) {
    return this.http.post(ApiRoutes.subClass.add, data)
  }

  updateSubClass(subClassId: number, data: any) {
    return this.http.post(ApiRoutes.subClass.update, {...data, subClassId})
  }

  getCaseSubCategoryById(id: number) {
    return this.http.get(ApiRoutes.subClass.byId, {
      params: {
        id
      }
    })
  }


  deleteCaseSubCategory(id: number) {
    return this.http.delete(ApiRoutes.subClass.delete, {
      params: {
        id
      }
    })
  }


  getGeneralLedgerBySubClassesId(dTParams: any,  subClassId:any) {
    return this.http.post<any>(`${ApiRoutes.generalLedger.bySubClassId}/${subClassId}`, dTParams)
  }

  addNewGeneralLedger(data: any) {
    return this.http.post(ApiRoutes.generalLedger.add, data)
  }

  updateGeneralLedgers(generalLedgerId: number, data: any) {
    return this.http.post(ApiRoutes.generalLedger.update, {...data, generalLedgerId})
  }

  getGeneralLedgerById(id: number) {
    return this.http.get(ApiRoutes.generalLedger.byId, {
      params: {
        id
      }
    })
  }


  deleteGeneralLedger(id: number) {
    return this.http.delete(ApiRoutes.generalLedger.delete, {
      params: {
        id
      }
    })
  }
}

