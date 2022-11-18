import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  headers: HttpHeaders;
  constructor(private http: HttpClient, private user: UserService) {
    this.headers = new HttpHeaders();
   }

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
    console.log("layout");

    let groupId = Number(JSON.parse(localStorage.getItem('user')!)?.groupId) || "1";
    return this.http.get<any>(ApiRoutes.auth.getMenu!, {
      params: {
        groupId
      }
    })
  }

  uploadSingleDocument(caseId: any, sharedWithClient: any, doc: File) {
    // let headers: HttpHeaders = this.headers;
    // headers.set("caseId", caseId);
    // headers.set("sharedWithClient", sharedWithClient);
    // headers.set("uploadedBy", this.user.getUser.userId);
    console.log(caseId, sharedWithClient, 'in service');
    
    let uploadedBy = this.user.getUser.userId;
    let formData = new FormData();
    formData.append('document', doc, doc.name);
    formData.append('caseId', caseId);
    formData.append('sharedWithClient', sharedWithClient);
    formData.append('uploadedBy', uploadedBy);
    return this.http.post(ApiRoutes.common.single, formData)
  }

  uploadMultipleDocuments(caseId: any, sharedWithClient: any, docs: FileList) {
    let uploadedBy = this.user.getUser.userId;
    let formData = new FormData();
    formData.append('caseId', caseId);
    formData.append('sharedWithClient', sharedWithClient);
    formData.append('uploadedBy', uploadedBy);
    for (var i = 0; i < docs.length; i++) {
      formData.append('Document '+i, docs[i], docs[i].name)
    }
    return this.http.post(ApiRoutes.common.multi, formData)
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
