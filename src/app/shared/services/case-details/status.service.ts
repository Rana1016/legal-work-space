import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiRoutes } from '../../api/routes';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public statusObservable: Observable<any>;

  constructor(private http: HttpClient) {
    this.statusObservable = this.statusSubject.asObservable();
  }

  caseStatus(caseId: string | number) {
    return this.http.get(ApiRoutes.caseStatus.getCaseStatus, {
      params: {
        caseId
      },
      responseType: 'text'
    })
    .pipe(tap((status) => this.statusSubject.next(status)));
  }

  changeCaseStatus(caseId: string | number, status: string) {
    return this.http.post(ApiRoutes.caseStatus.changeCaseStatus, {}, {
      params: {
        caseNumber: caseId,
        newStatus: status
      }
    })
    .pipe(tap((res) => {
      if (res == 1) {
        this.statusSubject.next(status);
        
      }
    }));
  }
}
