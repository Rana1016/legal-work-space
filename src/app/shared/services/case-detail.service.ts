import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class CaseDetailService {
  constructor(private http: HttpClient) { }

  caseStatus(caseId: string | number) {
    return this.http.get(ApiRoutes.caseDetails.status.getCaseStatus, {
      params: {
        caseId
      },
      responseType: 'text'
    })
  }

  changeCaseStatus(caseId: string | number, status: string) {
    return this.http.post(ApiRoutes.caseDetails.status.changeCaseStatus, {}, {
      params: {
        caseNumber: caseId,
        newStatus: status
      }
    })
  }

  addNewAmlCheckList(amlCheckList: any[]) {
    return this.http.post(ApiRoutes.caseDetails.aml.addAmlList, amlCheckList);
  }

  getAmlCheckListById(caseId: number) {
    return this.http.get<any[]>(ApiRoutes.caseDetails.aml.getById, {
      params: {
        caseId
      }
    })
  }

  checkAmlCheckPoint(ID: number | string, ifChecked: boolean) {
    return this.http.get(ApiRoutes.caseDetails.aml.checkAML, {
      params: {
        ID,
        ifChecked
      }
    })
  }

  getNotes(caseId: number) {
    return this.http.post<any[]>(ApiRoutes.caseDetails.notes.getById, {}, {
      params: {
        caseId
      }
    })
  }

  addNote(note: any) {
    return this.http.post(ApiRoutes.caseDetails.notes.addNote, note)
  }

  deleteNote(id: number) {
    return this.http.delete(ApiRoutes.caseDetails.notes.deleteNote, {
      params: {
        id
      }
    })
  }

  getKeyDatesByCaseId(id: number) {
    return this.http.get<any[]>(ApiRoutes.caseDetails.keydates.getById, {
      params: {
        id
      }
    })
  }

  getCaseDetails(caseId: number) {
    return this.http.get<any>(ApiRoutes.caseDetails.case, {
      params: {
        caseId
      }
    })
  }
}
