import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { newCaseInterface } from '../types/new-case.type';

@Injectable({
  providedIn: 'root',
})
export class NewCaseStepsService {
  
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) {}

  private newCaseFormSubject: BehaviorSubject<newCaseInterface | null> = new BehaviorSubject<newCaseInterface | null>(null);
  public newCaseForm: Observable<newCaseInterface | null> = this.newCaseFormSubject.asObservable();

  addStep(data: any) {
    this.newCaseFormSubject.next({...this.newCaseFormSubject.value, ...data})
  }

  getCategories():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}case/categories`);
  }

  getSubCategories(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}case/subCategories?categoryid=${id}`);
  }

  submitData(data: any) {
    
  }
}
