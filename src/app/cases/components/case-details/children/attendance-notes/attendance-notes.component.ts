import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-notes',
  templateUrl: './attendance-notes.component.html',
  styleUrls: ['./attendance-notes.component.scss']
})
export class AttendanceNotesComponent implements OnInit {
  attendanceNotes!: any[];
  constructor() { }

  ngOnInit(): void {
  }

}
