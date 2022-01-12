import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class LogbookFolderService {
  constructor(private http: HttpClient) { }

  addLogBookFolder(data: any) {
    return this.http.post(ApiRoutes.logBookFolder.add, data)
  }

  getAll(dTParams: any) {
    return this.http.post<any>(ApiRoutes.logBookFolder.all, dTParams)
  }

  getLogBookFolderById(id: number) {
    return this.http.get<any>(ApiRoutes.logBookFolder.byId, {
      params: {
        id
      }
    })
  }

  updateLogBookFolderById(logBookFolderId: number, data: any) {
    return this.http.post(ApiRoutes.logBookFolder.update, { ...data, logBookFolderId })
  }

  deleteLogBookFolder(id: number) {
    return this.http.delete(ApiRoutes.logBookFolder.delete, {
      params: {
        id
      }
    })
  }

  getLogBookFolderByUserId(userId: number, dTParams: any) {
    return this.http.post<any>(ApiRoutes.logBookFolder.byUserId, dTParams, {
      params: {
        userId
      }
    })
  }
}
