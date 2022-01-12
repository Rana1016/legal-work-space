import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-workflow-templates',
  templateUrl: './workflow-templates.component.html',
  styleUrls: ['./workflow-templates.component.scss']
})
export class WorkflowTemplatesComponent implements OnInit {
  constructor(private workflow: SharedService) { }
  workflows!: any[];
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
        processing: 'Loading Workflows...',
        emptyTable: 'No Workflows available.'
      },
      columns: [ {
        title: 'Title',
        data: 'title',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxWorkflows.bind(this)
    };
  }

  ajaxWorkflows(dTParams: any, callback: any) {
    this.workflow.getTableOptions(dTParams, 'tblWorkflow', 'workflowId', 'title', 'workflowId').subscribe(({records, totalRecords}) => {
      this.workflows = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteWorkflow(id: number) {
    this.workflow.deleteOption('tblWorkflow', 'workflowId', id).subscribe((res) => {
      if (res == 1) {
        this.workflows = this.workflows.filter(({workflowId}) => workflowId != id)
      }
    });
  }
}
