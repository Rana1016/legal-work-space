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
  getVoucherDetailsById(masterId: number, dTParams: any, search?: string) {
    return this.http.post(ApiRoutes.journalTransaction.byId, dTParams, {
      params: {
        masterId,
        ...(!!search && {search})
      }
    })
  }
  getAllPendingVouchers(groupId: number, dTParams: any) {
    return this.http.post(ApiRoutes.journalTransaction.pendingAll, dTParams, {
      params: {
        groupId
      }
    })
  }
  getPrintVoucherDetailsById(masterId: number) {
    return this.http.get(ApiRoutes.journalTransaction.printDetail, {
      params: {
        masterId
      }
    })
  }
  getAccountStatementDetails(fromDate: string, toDate: string, ledgerId: number) {
    return this.http.get(ApiRoutes.journalTransaction.accStatementDetails, {
      params: {
        fromDate,
        toDate,
        ledgerId
      }
    })
  }
  getTrialBalanceDetails(fromDate: string, toDate: string, glIds: string) {
    return this.http.get(ApiRoutes.journalTransaction.trialBalanceDetails, {
      params: {
        fromDate,
        toDate,
        glIds
      }
    })
  }
  approveVoucher(masterId: number, groupId: number, userId: number) {
    return this.http.get(ApiRoutes.journalTransaction.approveVoucher, {
      params: {
        masterId,
        groupId,
        userId
      }
    })
  }
}
