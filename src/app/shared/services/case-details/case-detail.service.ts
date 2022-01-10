import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../../api/routes';

@Injectable({
  providedIn: 'root'
})
export class CaseDetailService {
  constructor(private http: HttpClient) { }


}
