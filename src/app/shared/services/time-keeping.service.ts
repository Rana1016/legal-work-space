import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class TimeKeepingService {
  modalState: BehaviorSubject<any> = new BehaviorSubject(null);
  modalOpen: Observable<any>;
  constructor(private http: HttpClient) {
    this.modalOpen = this.modalState.asObservable();
  }

  addTime(data: any) {
    return this.http.post(ApiRoutes.timeKeep.add, data)
  }

  getAll(dTParams: any) {
    return this.http.post<any>(ApiRoutes.timeKeep.all, dTParams)
  }

  getByCaseId(caseId: number, dTParams: any) {
    return this.http.post<any>(`${ApiRoutes.timeKeep.byCaseId!}/${caseId}`, dTParams)
  }

  getTimeKeepById(id: number) {
    return this.http.get<any>(ApiRoutes.timeKeep.byId, {
      params: {
        id
      }
    })
  }

  updateTimeKeepById(timeKeepId: number, data: any) {
    return this.http.post(ApiRoutes.timeKeep.update, {...data, timeKeepId})
  }

  deleteTimeKeep(id: number) {
    return this.http.delete(ApiRoutes.timeKeep.delete, {
      params: {
        id
      }
    })
  }

  openModal(id?: number) {
    this.modalState.next(id);
  }
}
