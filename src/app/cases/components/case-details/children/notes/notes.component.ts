import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CaseDetailService } from 'src/app/shared/services/case-detail.service';
import { NotesService } from 'src/app/shared/services/notes.service';

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
    this.noteService.getNotes(this.caseId).subscribe((notes) => this.notes = notes)
  }
  deleteNote(noteId: number) {
    this.noteService.deleteNote(noteId).subscribe((response) => {
      response == 1 && (this.notes = this.notes.filter(({noteId}) => noteId != noteId))
    })
  }
}
