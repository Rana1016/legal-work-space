import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientSubject: BehaviorSubject<any> = new BehaviorSubject(Number(localStorage.getItem('clientCase')));
  clientObservable: Observable<any>;
  constructor(private http: HttpClient) {
    this.clientObservable = this.clientSubject.asObservable();
  }

  updateClient(caseId: number) {
    this.clientSubject.next(caseId);
    localStorage.setItem('clientCase', `${caseId}`)
  }

  getClientInfo(caseId: number) {
    return this.http.get(ApiRoutes.clientPortal.getInfo, {
      params: {
        caseId
      }
    })
  }

  toggleClientStatus(caseId: number, status: boolean) {
    return this.http.get(ApiRoutes.clientPortal.toggleStatus, {
      params: {
        caseId,
        status
      }
    })
  }

  changePassword(userName: string, oldPassword: string, newPassword: string) {
    return this.http.get(ApiRoutes.clientPortal.changePassword, {
      params: {
        userName,
        oldPassword,
        newPassword
      }
    })
  }

  getClientCases(clientId: number, dTParams: any) {
    return this.http.get<any>(ApiRoutes.clientPortal.getCasesById, {
      params: {
        clientId
      }
    })
  }

  getClientDocuments(clientId: number, dTParams: any) {
    return this.http.get<any>(ApiRoutes.clientPortal.getDocs, {
      params: {
        clientId
      }
    })
  }
}
