import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class KeydatesService {

  constructor(private http: HttpClient) { }

  getKeyDates(dTParams: any) {
    return this.http.post<any[]>(ApiRoutes.keyDates.all, dTParams)
  }

  getKeyDatesByCaseId(id: number) {
    return this.http.get<any[]>(ApiRoutes.keyDates.getById, {
      params: {
        id
      }
    })
  }
}
