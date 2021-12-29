import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http: HttpClient) { }

  getOptions(tableName: string, keyValueColumnName: string, displayValueColumnName: string, whereColumn?: string, whereValue?: string) {
    return this.http.get<any[]>(ApiRoutes.lookup.get, {
      params: {
        tableName,
        keyValueColumnName,
        displayValueColumnName,
        ...(!!whereColumn && { whereColumn }),
        ...(!!whereValue && { whereValue })
      }
    })
  }
}
