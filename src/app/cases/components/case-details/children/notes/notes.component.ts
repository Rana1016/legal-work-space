import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/shared/services/case-details/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit {
  constructor(private noteService: NotesService, private router: Router) {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
  }
  caseId!: number;
  notes!: any[];
  ngOnInit(): void {
    this.noteService.notesObservable.subscribe(notes => {
      if (!!notes) {
        this.notes = notes
      } else {
        this.noteService.getNotes(this.caseId).subscribe();
      }
    });
  }
  deleteNote(noteId: number) {
    this.noteService.deleteNote(noteId).subscribe((response) => {
      response == 1 && (this.notes = this.notes.filter(({noteId}) => noteId != noteId))
    })
  }
}
