import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class VatRateService {
  constructor(private http: HttpClient) {}

  getVatRates(dTParams: any) {
    return this.http.post<any>(ApiRoutes.vatRates.all, dTParams)
  }

  getAll() {
    return this.http.get<any[]>(ApiRoutes.vatRates.all)
  }

  addVatRate(data: any) {
    return this.http.post(ApiRoutes.vatRates.add, data)
  }

  updateVatRate(vatRateId: number, data: any) {
    return this.http.post(ApiRoutes.vatRates.update, {...data, vatRateId})
  }

  getVatRateById(id: number) {
    return this.http.get(ApiRoutes.vatRates.byId, {
      params: {
        id
      }
    })
  }

  deleteVatRate(id: number) {
    return this.http.delete(ApiRoutes.vatRates.delete, {
      params: {
        id
      }
    })
  }
}
