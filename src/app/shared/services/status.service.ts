import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  caseStatus(caseId: string | number) {
    return this.http.get(ApiRoutes.caseStatus.getCaseStatus, {
      params: {
        caseId
      },
      responseType: 'text'
    })
  }

  changeCaseStatus(caseId: string | number, status: string) {
    return this.http.post(ApiRoutes.caseStatus.changeCaseStatus, {}, {
      params: {
        caseNumber: caseId,
        newStatus: status
      }
    })
  }
}
