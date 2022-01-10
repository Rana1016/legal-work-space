import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }
  getDashboardStats(year?: number) {
    return this.http.get<any>(ApiRoutes.dashboard.getStats, {
      params: {
        ...(!!year && { year })
      }
    })
  }
}
