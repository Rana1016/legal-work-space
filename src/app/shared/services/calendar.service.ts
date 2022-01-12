import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private http: HttpClient) { }
  addEvent(data: any) {
    return this.http.post(ApiRoutes.calendarEvents.add, data)
  }
  getEventsByUserId(userId: number) {
    return this.http.post<any>(ApiRoutes.calendarEvents.byUserId, {}, {
      params: {
        userId
      }
    })
  }

  getEventsBySearch(searchValue: string, userId: number) {
    return this.http.get<any>(ApiRoutes.calendarEvents.bySearch, {
      params: {
        searchValue,
        userId
      }
    })
  }

  getEventById(id: number) {
    return this.http.get(ApiRoutes.calendarEvents.byId, {
      params: {
        id
      }
    })
  }

  updateEvent(data: any) {
    return this.http.post(ApiRoutes.calendarEvents.update, data)
  }
}
