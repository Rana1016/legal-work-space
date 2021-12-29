import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(data: any) {
    return this.http.post(ApiRoutes.user.addUser, data)
  }

  getAll(dTParams: any) {
    return this.http.post<any>(ApiRoutes.user.all, dTParams)
  }

  getUserById(id: number) {
    return this.http.get<any>(ApiRoutes.user.byId, {
      params: {
        id
      }
    })
  }

  updateUserById(userId: number, data: any) {
    return this.http.post(ApiRoutes.user.update, {...data, userId})
  }

  deleteUser(id: number) {
    return this.http.delete(ApiRoutes.user.delete, {
      params: {
        id
      }
    })
  }
}
