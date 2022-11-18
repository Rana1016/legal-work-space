import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../../api/routes';

@Injectable({
  providedIn: 'root'
})
export class AccoutService {

  constructor(private http: HttpClient) { }

  getAccountDetailById(caseId : any){
    return this.http.get<any[]>(ApiRoutes.accountDetails.getById, {
      params: {
        caseId
      }
    })
  }
}
