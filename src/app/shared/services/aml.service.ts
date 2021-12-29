import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class AmlService {

  constructor(private http: HttpClient) { }

  addNewAmlCheckList(amlCheckList: any[]) {
    return this.http.post(ApiRoutes.caseAml.addAmlList, amlCheckList);
  }

  getAmlCheckListById(caseId: number) {
    return this.http.get<any[]>(ApiRoutes.caseAml.getById, {
      params: {
        caseId
      }
    })
  }

  checkAmlCheckPoint(ID: number | string, ifChecked: boolean) {
    return this.http.get(ApiRoutes.caseAml.checkAML, {
      params: {
        ID,
        ifChecked
      }
    })
  }

}
