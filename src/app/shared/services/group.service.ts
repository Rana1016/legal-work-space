import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private http: HttpClient) { }
  getAll(dTParams: any) {
    return this.http.post<any>(ApiRoutes.group.all, dTParams);
  }
  addGroup(data: any) {
    return this.http.post<any>(ApiRoutes.group.addGroup, data)
  }
  getGroupById(id: number) {
    return this.http.get<any>(ApiRoutes.group.byId, {
      params: {
        id
      }
    });
  }
  updateGroupById(groupId: number, data: any) {
    return this.http.post(ApiRoutes.group.update, {...data, groupId})
  }
  deleteGroup(id: number) {
    return this.http.delete(ApiRoutes.group.delete, {
      params: {
        id
      }
    })
  }
}
