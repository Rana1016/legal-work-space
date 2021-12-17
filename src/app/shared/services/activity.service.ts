import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getActivitiesById(caseId: number, pageNumber: number, pageSize: number) {
    return this.http.post(ApiRoutes.cases.activities.allById, {
      params: {
        caseId,
        pageNumber,
        pageSize
      }
    });
  }
}
