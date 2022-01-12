import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http: HttpClient, private user: UserService) { }

  getGlobalSettings() {
    return this.http.get<any>(ApiRoutes.globalSettings.get);
  }

  updateGlobalSettings(data: any) {
    return this.http.post(ApiRoutes.globalSettings.update, data)
  }

  getOptions(tableName: string, keyValueColumnName: string, displayValueColumnName: string, whereColumn?: string, whereValue?: number | string) {
    return this.http.get<any[] | any>(ApiRoutes.lookup.get, {
      params: {
        tableName,
        keyValueColumnName,
        displayValueColumnName,
        ...(!!whereColumn && { whereColumn }),
        ...(!!whereValue && { whereValue })
      }
    })
  }

  getTableOptions(dTParams: any, tableName: string, keyValueColumnName: string, displayValueColumnName: string, primaryKey: string, whereColumn?: string, whereValue?: number | string) {
    return this.http.post<any>(ApiRoutes.lookup.table, dTParams, {
      params: {
        tableName,
        keyValueColumnName,
        displayValueColumnName,
        primaryKey,
        ...(!!whereColumn && { whereColumn }),
        ...(!!whereValue && { whereValue })
      }
    })
  }

  addOption(tableName: string, keyValueColumnName: string = '', displayValueColumnName: string, keyValue: string = '', displayValue: string) {
    return this.http.post(ApiRoutes.lookup.add, {tableName, keyValueColumnName, displayValueColumnName, keyValue, displayValue});
  }

  updateOption(tableName: string, keyValueColumnName: string, displayValueColumnName: string, keyValue: string, displayValue: string,) {
    return this.http.post(ApiRoutes.lookup.edit, {tableName, keyValueColumnName, displayValueColumnName, keyValue, displayValue});
  }
  
  deleteOption(tableName: string, deleteByColumnName: string, deleteWhereValue: number) {
    return this.http.delete(ApiRoutes.lookup.delete, {
      params: {
        tableName,
        deleteByColumnName,
        deleteWhereValue
      }
    })
  }

  getMenu() {
    let groupId = Number(JSON.parse(localStorage.getItem('user')!).groupId);
    return this.http.get<any>(ApiRoutes.auth.getMenu!, {
      params: {
        groupId
      }
    })
  }

  uploadSingleDocument(caseId: any, sharedWithClient: any, doc: File) {
    let uploadedBy = this.user.getUser.userId;
    let formData = new FormData();
    formData.append('document', doc, doc.name);
    return this.http.post(ApiRoutes.common.single, formData, {
      headers: {
        caseId,
        sharedWithClient,
        uploadedBy
      }
    })
  }

  uploadMultipleDocuments(caseId: any, sharedWithClient: any, docs: FileList) {
    let uploadedBy = this.user.getUser.userId;
    let formData = new FormData();
    for (var i = 0; i < docs.length; i++) {
      formData.append('Document '+i, docs[i], docs[i].name)
    }
    return this.http.post(ApiRoutes.common.multi, formData, {
      headers: {
        caseId,
        sharedWithClient,
        uploadedBy
      }
    })
  }

  getNotificationsCount() {
    return this.http.get<any>(ApiRoutes.notification.get);
  }

  updateNotification(notificationType: string) {
    return this.http.post(ApiRoutes.notification.update, {}, {
      params: {
        notificationType
      }
    })
  }
}
