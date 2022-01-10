import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class LogbookService {
  constructor(private http: HttpClient) { }

  addLogBook(data: any) {
    return this.http.post(ApiRoutes.logBook.add, data)
  }

  getAll(dTParams: any) {
    return this.http.post<any>(ApiRoutes.logBook.all, dTParams)
  }

  getLogBookById(id: number) {
    return this.http.get<any>(ApiRoutes.logBook.byId, {
      params: {
        id
      }
    })
  }

  updateLogBookById(logBookId: number, data: any) {
    return this.http.post(ApiRoutes.logBook.update, { ...data, logBookId })
  }

  deleteLogBook(id: number) {
    return this.http.delete(ApiRoutes.logBook.delete, {
      params: {
        id
      }
    })
  }

  getLogBookByLogBookFolderId(logBookFolderId: number, dTParams: any) {
    return this.http.post<any>(`${ApiRoutes.logBook.byLogBookFolderId}/${logBookFolderId}`, dTParams)
  }
}
