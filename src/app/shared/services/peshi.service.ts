import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class PeshiService {
  constructor (private http: HttpClient) {}
  getAll() {
    return this.http.get<any>(ApiRoutes.peshi.all);
  }
  addPeshi(data: any) {
    return this.http.post<any>(ApiRoutes.peshi.add, data)
  }
  getPeshiById(id: number) {
    return this.http.get<any>(ApiRoutes.peshi.byId, {
      params: {
        id
      }
    });
  }
  updatePeshiById(peshiId: number, data: any) {
    return this.http.post(ApiRoutes.peshi.update, {...data, peshiId})
  }
  deletePeshi(id: number) {
    return this.http.delete(ApiRoutes.peshi.delete, {
      params: {
        id
      }
    })
  }

  getPeshisByCaseId(caseId: number, dTParams: any) {
    return this.http.post<any>(`${ApiRoutes.peshi.byCaseId}/${caseId}`, dTParams)
  }
}
