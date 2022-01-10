import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}
  
  getActivities(dTParams: any) {
    return this.http.post<any>(ApiRoutes.caseActivities.all, dTParams)
  }

  getActivitiesByCaseId(dTParams: any, caseId: number) {
    return this.http.post<any>(`${ApiRoutes.caseActivities.allById}/${caseId}`, dTParams);
  }
  
  getActivitiesByDate(dTParams: any, date: string) {
    return this.http.post<any>(`${ApiRoutes.caseActivities.allByDate}/${date}`, dTParams);
  }
  
  getActivityById(id: number) {
    return this.http.get(ApiRoutes.caseActivities.allById, {
      params: {
        id
      }
    });
  }

  updateActivityById(activityId: number, data: any) {
    return this.http.post(ApiRoutes.caseActivities.update, { ...data, activityId })
  }

  deleteActivity(id: number) {
    return this.http.delete(ApiRoutes.caseActivities.delete, {
      params: {
        id
      }
    })
  }

}
