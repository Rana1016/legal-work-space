import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class ContactGroupService {
  constructor(private http: HttpClient) { }

  addContactGroup(data: any) {
    return this.http.post(ApiRoutes.contactGroup.add, data)
  }

  getAll(dTParams: any) {
    return this.http.post<any>(ApiRoutes.contactGroup.all, dTParams)
  }

  getContactGroupById(id: number) {
    return this.http.get<any>(ApiRoutes.contactGroup.byId, {
      params: {
        id
      }
    })
  }

  updateContactGroupById(contactGroupId: number, data: any) {
    return this.http.post(ApiRoutes.contactGroup.update, { ...data, contactGroupId })
  }

  deleteContactGroup(id: number) {
    return this.http.delete(ApiRoutes.contactGroup.delete, {
      params: {
        id
      }
    })
  }

  getContactGroupByUserId(userId: number, dTParams: any) {
    return this.http.get(ApiRoutes.contactGroup.byUserId, {
      params: {
        userId
      }
    })
  }
}
