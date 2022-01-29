import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateService {

  constructor(private http: HttpClient) { }
  addDocumentTemplate(data: any) {
    return this.http.post(ApiRoutes.documentTemplate.add, data)
  }

  getAll(dTParams: any, search?: string) {
    return this.http.post<any>(ApiRoutes.documentTemplate.all, dTParams, {
      params: {
        ...(!!search && {search})
      }
    })
  }


  getDocumentTemplateById(id: number) {
    return this.http.get<any>(ApiRoutes.documentTemplate.byId, {
      params: {
        id
      }
    })
  }

  updateDocumentTemp(documentTemplateId: number, data: any) {
    return this.http.post(ApiRoutes.documentTemplate.update, {...data, documentTemplateId})
  }

  deleteDocumentTemplate(id: number) {
    return this.http.delete(ApiRoutes.documentTemplate.delete, {
      params: {
        id
      }
    })
  }
}
