import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiRoutes } from '../api/routes';
import { stepFormInterface } from '../interfaces/case.interface';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  private cDSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public cDObservable: Observable<any>;
  private pDSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public pDObservable: Observable<any>;

  constructor(private http: HttpClient) {
    this.cDObservable = this.cDSubject.asObservable();
    this.pDObservable = this.pDSubject.asObservable();
  }

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

  getCases(dTParams: Object, search?: string, status?: string) {
    return this.http.post<any[]>(ApiRoutes.cases.all, dTParams, {
      headers: {
        ...(!!search && {search}),
        ...(!!status && {status})
      }
    })
  }

  getCaseDetails(caseId: number) {
    return this.http.get<any>(ApiRoutes.cases.caseDetails, {
      params: {
        caseId
      }
    })
    .pipe(tap((cD) => this.cDSubject.next(cD)));
  }

  editCaseDetails(caseId: number, data: any) {
    return this.http.post<any>(ApiRoutes.cases.editCaseDetails, {...data, caseId})
  }

  getPersonalDetails(caseId: number) {
    return this.http.get<any>(ApiRoutes.cases.personalDetails, {
      params: {
        caseId
      }
    })
    .pipe(tap((pD) => this.pDSubject.next(pD)));
  }

  editPersonalDetails(personID: number, data: any) {
    return this.http.post<any>(ApiRoutes.cases.editPersonalDetails, {...data, personID})
  }

  deleteProfile(personId: number) {
    return this.http.get(ApiRoutes.cases.deleteProfile, {
      params: {
        personId
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

  getDocumentsByCaseId(caseId: number, dTParams: any) {
    return this.http.post<any>(`${ApiRoutes.common.documentsByCaseId}/${caseId}`, dTParams);
  }
}
