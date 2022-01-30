import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  user: Observable<any>;
  constructor(private http: HttpClient, private router: Router) {
    this.user = this.userSubject.asObservable();
  }

  get getUser() {
    return JSON.parse(localStorage.getItem('user')!)
  }

  get getClient() {
    return JSON.parse(localStorage.getItem('client')!)
  }

  login(data: any) {
    return this.http.post<any>(ApiRoutes.auth.login, data, {observe: 'response'})
    .pipe(
      tap((res) => {
        if (res.status == 200) {
          localStorage.setItem('user', JSON.stringify(res.body))
        }
      })
    );
  }

  clientLogin(data: any) {
    return this.http.post<any>(ApiRoutes.auth.clientLogin, data , {observe: 'response'})
    .pipe(
      tap((res : any) => {
        if (res.status == 200) {
          localStorage.setItem('client', JSON.stringify(res.body.response[0]))
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  customerLogout() {
    localStorage.removeItem('client');
    this.router.navigate(['/cases']);
  }

  addUser(data: any) {
    return this.http.post(ApiRoutes.user.add, data)
  }

  changePassword(data: any) {
    return this.http.post(ApiRoutes.user.changePwd, {

    })
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
