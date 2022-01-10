import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class KeydatesService {
  constructor(private http: HttpClient) {}
  getKeyDates(dTParams: any) {
    return this.http.post<any>(ApiRoutes.keyDates.all, dTParams)
  }

  getKeyDatesByCaseId(caseId: number, dTParams: any) {
    return this.http.post<any>(`${ApiRoutes.keyDates.byCaseId}/${caseId}`, dTParams)
  }

  delete(id: number) {
    return this.http.delete(ApiRoutes.keyDates.delete, {
      params: {
        id
      }
    })
  }
}
