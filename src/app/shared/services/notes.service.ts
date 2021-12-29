import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getNotes(caseId: number) {
    return this.http.post<any[]>(ApiRoutes.caseNotes.getById, {}, {
      params: {
        caseId
      }
    })
  }

  addNote(note: any) {
    return this.http.post(ApiRoutes.caseNotes.addNote, note)
  }

  deleteNote(id: number) {
    return this.http.delete(ApiRoutes.caseNotes.deleteNote, {
      params: {
        id
      }
    })
  }
}
