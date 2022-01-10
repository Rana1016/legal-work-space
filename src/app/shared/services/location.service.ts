import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}

  addLocation(data: any) {
    return this.http.post(ApiRoutes.location.add, data)
  }

  getAll(dTParams: any) {
    return this.http.post<any>(ApiRoutes.location.all, dTParams)
  }

  getLocationById(id: number) {
    return this.http.get<any>(ApiRoutes.location.byId, {
      params: {
        id
      }
    })
  }

  updateLocationById(locationId: number, data: any) {
    return this.http.post(ApiRoutes.location.update, {...data, locationId})
  }

  deleteLocation(id: number) {
    return this.http.delete(ApiRoutes.location.delete, {
      params: {
        id
      }
    })
  }
}
