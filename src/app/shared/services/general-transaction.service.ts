import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';
@Injectable({
  providedIn: 'root'
})
export class GeneralTransactionService {

  constructor(private http: HttpClient) { }
  addNewJournalVoucher(data: any) {
    return this.http.post(ApiRoutes.journalTransaction.add, data)
  }
  getJournalVouchersMaster(dTParams: any) {
    return this.http.post<any>(ApiRoutes.journalTransaction.all, dTParams)
  }
  getVoucherDetailsById(id: number) {
    return this.http.get(ApiRoutes.journalTransaction.byId, {
      params: {
        id
      }
    })
  }

}
