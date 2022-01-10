import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  constructor(private task: TasksService, private lookup: SharedService) {
    this.lookup.getOptions('tblUser', 'UserId', 'Name').subscribe((users) => this.assignees = users);
  }
  tasks!: any[];
  title!: string;
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      serverSide: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: true,
      processing: true,
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      language: {
        infoEmpty: '',
        emptyTable: 'No Tasks available.'
      },
      columns: [{
        title: 'Deadline',
        width: '250',
        data: 'deadline',
        orderable: true
      },
      {
        title: 'Priority',
        width: '150',
        data: 'priority',
        orderable: true
      },
      {
        title: 'Title',
        width: '450',
        data: 'title',
        orderable: true
      },
      {
        title: 'Case Reference',
        width: '400',
        data: 'caseId',
        orderable: true
      },
      {
        title: 'Assigned to',
        width: '200',
        data: 'assignedTo',
        orderable: true
      },
      {
        title: 'Assigned on',
        width: '200',
        data: 'assignedOn',
        orderable: true
      },
      {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxTasks.bind(this)
    };
  }

  assignees!: any[];

  getUser(userId: number) {
    return (this.assignees?.find((a) => { if (a.keyValue == userId) {return a.displayValue}}) || 'N/A')
  }

  ajaxTasks(dTParams: any, callback: any) {
    this.task.getAll(dTParams).subscribe(({records, totalRecords}) => {
      this.tasks = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    });
  }

  deleteTask(id: number) {
    this.task.deleteTask(id).subscribe((res) => {
      if (res == 1) {
        this.tasks = this.tasks.filter(({taskId}) => taskId != id)
      }
    });
  }
}
