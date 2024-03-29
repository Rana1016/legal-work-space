import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CasesService } from 'src/app/shared/services/cases.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  isValid?: boolean = true;
  clientName?: string = "";
  searchId = '';
  constructor(private caseService: CasesService,private fb: FormBuilder, private task: TasksService, private lookup: SharedService, private router: Router, private route: ActivatedRoute) { }
  newTaskForm!: FormGroup;
  edit!: number;

  ngOnInit(): void {
    this.newTaskForm = this.fb.group({
      caseId: [''],
      deadline: [new Date().toISOString()],
      priority: ["1"],
      assignedTo: ["0"],
      assignedOn: [new Date().toISOString()],
      status: ['in-progress'],
      title: [''],
      details: ['']
    });
    this.lookup.getOptions('tblUser', 'UserId', 'Name').subscribe((users) => this.assignees = users);
    this.route.params.subscribe(({taskId}) => {
      this.edit = Number(taskId);
      this.task.getTasksById(Number(taskId)).subscribe((data) => this.newTaskForm.patchValue(data))
    });
  }

  assignees = [];

  submitForm() {
    let data = {
      ...this.newTaskForm.value,
      caseId: Number(this.newTaskForm.value.caseId)
    };
    (!this.edit ? this.task.addTask(data) : this.task.updateTaskById(this.edit, data)).subscribe((res) => res == 1 && this.router.navigate( !this.edit ? ['..'] : ['../..'], {relativeTo: this.route}))
  }
  checkCase(caseId: string | number) {
    if ((<string>caseId).length >= 4) {
      caseId = Number(caseId)
      this.caseService.isValid(caseId).subscribe(({ message, clientName }: any) => {
        this.clientName = clientName;
        this.isValid = message == undefined
      })
    } else {
      this.isValid = true;
      this.clientName = "";
    }
  }
}
