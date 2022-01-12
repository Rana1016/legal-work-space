import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class LogbookService {
  constructor(private http: HttpClient) { }

  addLogBook(data: any, doc: File) {
    let formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('document', doc, doc.name);
    return this.http.post(ApiRoutes.logBook.add, formData)
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

  updateLogBookById(logBookId: number, data: any, doc?: File) {
    let formData = new FormData();
    formData.append('data', JSON.stringify({ ...data, logBookId }));
    !!doc && formData.append('document', doc, doc?.name);
    return this.http.post(ApiRoutes.logBook.update, formData)
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
