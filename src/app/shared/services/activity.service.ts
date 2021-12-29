import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}
  
  getActivities(dTParams: any) {
    return this.http.post<any[]>(ApiRoutes.caseActivities.all, dTParams)
  }

  getActivitiesByDate(dTParams: any, date: string) {
    return this.http.post<any[]>(ApiRoutes.caseActivities.all, dTParams, {
      params: {
        date
      }
    })
  }

  getActivitiesById(dTParams: any, caseId: number) {
    return this.http.post(ApiRoutes.caseActivities.allById, dTParams, {
      params: {
        caseId
      }
    });
  }

}
