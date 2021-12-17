import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CaseDetailService } from 'src/app/shared/services/case-detail.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit {
  constructor(private caseDetailService: CaseDetailService, private router: Router) {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
  }
  caseId!: number;
  notes!: any[];
  ngOnInit(): void {
    this.caseDetailService.getNotes(this.caseId).subscribe((notes) => this.notes = notes)
  }
  deleteNote(noteId: number) {
    this.caseDetailService.deleteNote(noteId).subscribe((response) => {
      response == 1 && (this.notes = this.notes.filter(({noteId}) => noteId != noteId))
    })
  }
}
