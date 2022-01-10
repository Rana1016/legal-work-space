import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  constructor(private http: HttpClient) { }
  addConsultation(data: any) {
    return this.http.post(ApiRoutes.consultation.add, data)
  }

  getAll(dTParams: any, search?: string) {
    return this.http.post<any>(ApiRoutes.consultation.all, dTParams, {
      params: {
        ...(!!search && {search})
      }
    })
  }

  getByDateRange(startDate: string, endDate: string, dTParams: any) {
    return this.http.post(`${ApiRoutes.consultation.byDateRange}/${startDate}/${endDate}`, dTParams)
  }

  getConsultationById(id: number) {
    return this.http.get<any>(ApiRoutes.consultation.byId, {
      params: {
        id
      }
    })
  }

  updateConsultationById(consultationId: number, data: any) {
    return this.http.post(ApiRoutes.consultation.update, {...data, consultationId})
  }

  deleteConsultation(id: number) {
    return this.http.delete(ApiRoutes.consultation.delete, {
      params: {
        id
      }
    })
  }

  convertToCase(consultationId: number) {
    return this.http.get(ApiRoutes.consultation.convert, {
      params: {
        consultationId
      }
    })
  }
}
