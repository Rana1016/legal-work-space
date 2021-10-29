import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import stepValueInterface from 'src/app/new-case/steps/stepForm.interface';
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

  getSubCategories(categories: any[]):Observable<any>{
    return this.http.post<any[]>(`${this.baseUrl}case/subCategories`, {
      categories
    });
  }

  submitData({
    caseId,
      isTemporaryCase,
      modeOfCorrespondence,
      howDidYouHear,
      categoryId,
      subCategoryId,
      briefCaseDescription,
      caseSuperVisor,
      caseworker,
      clientInstructions,
      adviceGivenToClient,
      agreedPlanOfAction,
      chancesOfSuccess,
      weaknessesOfCase,
      conflictsOfInterest,
      conflictsOfInterestDesc,
      haveCriminalConviction,
      criminalConvictionDesc,
      addtionalInfo,
      feeType,
      coveredByFee,
      agreedAmountOrPercentage,
      isVATIncluded,
      advancePayment,
      courtId,
      isMatter,
      parentId,
      hourlyRateCaseworker,
      isDeleted,
      clients,
      installments
  } : any) {
    return this.http.post<any[]>(`${this.baseUrl}case/newCase`, {
      entityCase: {
        caseId,
        isTemporaryCase,
        modeOfCorrespondence,
        howDidYouHear,
        categoryId,
        subCategoryId,
        briefCaseDescription,
        caseSuperVisor,
        caseworker,
        clientInstructions,
        adviceGivenToClient,
        agreedPlanOfAction,
        chancesOfSuccess,
        weaknessesOfCase,
        conflictsOfInterest,
        conflictsOfInterestDesc,
        haveCriminalConviction,
        criminalConvictionDesc,
        addtionalInfo,
        feeType,
        coveredByFee,
        agreedAmountOrPercentage,
        isVATIncluded,
        advancePayment,
        courtId,
        isMatter,
        parentId,
        hourlyRateCaseworker,
        isDeleted
      } as stepValueInterface,
      clients: clients,
      installments: installments
    });
  }

  getData(pgNum: number, pgSize: number) {
    return this.http.post(`${this.baseUrl}case/getCases`+'?pageNumber='+pgNum+'&pageSize='+pgSize, {})
  }
}
