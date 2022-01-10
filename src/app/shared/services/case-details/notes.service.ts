import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiRoutes } from '../../api/routes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public notesObservable: Observable<any>;

  constructor(private http: HttpClient) {
    this.notesObservable = this.notesSubject.asObservable();
  }

  getNotes(caseId: number) {
    return this.http.post<any[]>(ApiRoutes.caseNotes.getById, {}, {
      params: {
        caseId
      }
    })
    .pipe(tap((notes) => this.notesSubject.next(notes)));
  }

  addNote(note: any) {
    return this.http.post(ApiRoutes.caseNotes.addNote, note)
    .pipe(tap((res) => {
      if (res == 1) {
        this.notesSubject.next([...this.notesSubject.value, note])
      }
    }));
  }

  deleteNote(id: number) {
    return this.http.delete(ApiRoutes.caseNotes.deleteNote, {
      params: {
        id
      }
    }).pipe(tap((res) => {
      if (res == 1) {
        this.notesSubject.next(this.notesSubject.value.filter(({noteId}: any) => noteId != id))
      }
    }));
  }
}
