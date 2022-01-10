import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  addContact(data: any) {
    return this.http.post(ApiRoutes.contact.add, data)
  }

  getAll(dTParams: any) {
    return this.http.post<any>(ApiRoutes.contact.all, dTParams)
  }

  getContactById(id: number) {
    return this.http.get<any>(ApiRoutes.contact.byId, {
      params: {
        id
      }
    })
  }

  updateContactById(contactId: number, data: any) {
    return this.http.post(ApiRoutes.contact.update, {...data, contactId})
  }

  deleteContact(id: number) {
    return this.http.delete(ApiRoutes.contact.delete, {
      params: {
        id
      }
    })
  }

  getContactByGroupId(contactGroupId: number, dTParams: any) {
    return this.http.post<any>(`${ApiRoutes.contact.byContactGroupId}/${contactGroupId}`, dTParams)
  }
}
