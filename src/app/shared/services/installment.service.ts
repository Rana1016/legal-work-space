import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService {
  constructor(private http: HttpClient) { }
  getInstallments(dTParams: any, date: any) {
    return this.http.post<any>(`${ApiRoutes.installment.overdue}/${date}`, dTParams)
  }
}
