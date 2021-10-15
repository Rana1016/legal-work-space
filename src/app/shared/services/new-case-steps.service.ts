import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { newCaseInterface } from '../types/new-case.type';

@Injectable({
  providedIn: 'root',
})
export class NewCaseStepsService {
  constructor() {}
  private newCaseFormSubject: BehaviorSubject<newCaseInterface | null> =
    new BehaviorSubject<newCaseInterface | null>(null);
    public newCaseForm: Observable<newCaseInterface | null> = this.newCaseFormSubject.asObservable();
}
