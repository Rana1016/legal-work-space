import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/shared/services/case-details/notes.service';
@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {
  caseId: number;
  newNoteForm: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private noteService: NotesService) {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 3]);
    this.newNoteForm = this.fb.group({
      title: [''],
      description: [''],
      dateAdded: [new Date()],
      caseId: [this.caseId],
      addedBy: ['']
    });
  }

  ngOnInit(): void {

  }
  submitForm() {
    this.noteService.addNote(this.newNoteForm.value).subscribe((data) => {
      data == true && this.router.navigate(['..'], {relativeTo: this.route})
    })
  }
}
