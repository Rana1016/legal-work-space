import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiRoutes } from '../../api/routes';

@Injectable({
  providedIn: 'root'
})
export class AmlService {
  private chkListSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public chkListObservable: Observable<any>;

  constructor(private http: HttpClient) {
    this.chkListObservable = this.chkListSubject.asObservable();
  }

  addNewAmlCheckList(amlCheckList: any[]) {
    return this.http.post(ApiRoutes.caseAml.addAmlList, amlCheckList)
      .pipe(tap((res) => {
        if (res == 1) {
          this.chkListSubject.next([this.chkListSubject.value, ...amlCheckList])
        }
      }));
  }

  getAmlCheckListById(caseId: number) {
    return this.http.get<any[]>(ApiRoutes.caseAml.getById, {
      params: {
        caseId
      }
    })
    .pipe(tap((chkLists) => {
        this.chkListSubject.next(chkLists)
    }));
  }

  checkAmlCheckPoint(ID: number | string, ifChecked: boolean) {
    return this.http.get(ApiRoutes.caseAml.checkAML, {
      params: {
        ID,
        ifChecked
      }
    })
  }

}
