import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  newTaskForm!: FormGroup;

  ngOnInit(): void {
    this.newTaskForm = this.fb.group({
      caseId: [''],
      deadline: [{ year: moment(new Date()).year(), month: moment(new Date()).month() + 1, day: moment().date() }],
      priority: [1],
      assignee: [0],
      title: [''],
      details: ['']
    });
  }

  assignees = [
    {
      assigneeId: 4001,
      assigneeName: "Dr. Mazhar Ilahi"
    }
  ]

}
