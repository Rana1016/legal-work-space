import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiRoutes } from '../api/routes';
import { stepFormInterface } from '../interfaces/case.interface';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  constructor(private http: HttpClient) {}


  getCategories(): Observable<any> {
    return this.http.get<any>(ApiRoutes.cases.categories);
  }

  getSubCategories(categoriesIds: any[]): Observable<any> {
    return this.http.post<any[]>(ApiRoutes.cases.subCategories, {
      categoriesIds
    });
  }

  addNewCase({caseDetails, teamDetails, courtDetails, parentCaseId, isMatter, paymentOptions, plaintiffType, thirdParties, isTemporary, plaintiffs, defendants}: stepFormInterface) {
    return this.http.post<any>(ApiRoutes.cases.addNewCase, {
      parentCaseId,
      caseDetails,
      teamDetails,
      courtDetails,
      paymentOptions,
      plaintiffType,
      isMatter,
      isTemporary,
      plaintiffs,
      defendants,
      thirdParties
    })
  }

  getCases(dTParams: Object) {
    return this.http.post<any[]>(ApiRoutes.cases.all, dTParams)
  }

  getCaseDetails(caseId: number) {
    return this.http.get<any>(ApiRoutes.cases.byCaseId, {
      params: {
        caseId
      }
    })
  }

  isValid(caseId: number) {
    return this.http.get(ApiRoutes.cases.isValid, {
      params: {
        caseId
      }
    })
  }
}
