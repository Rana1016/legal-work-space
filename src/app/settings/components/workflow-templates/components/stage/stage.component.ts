import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  constructor(private workflowStage: SharedService, private route: ActivatedRoute) { }
  workflowStages!: any[];
  workflowId!: number;
  dtTrigger: Subject<any> = new Subject();
  dtOptions!: DataTables.Settings;
  workflowTitle!: string;

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
        processing: 'Loading Workflow Stages...',
        emptyTable: 'No Workflow Stages available.'
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
      destroy: true,
      ajax: this.ajaxWorkflowStages.bind(this)
    };
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.route.params.subscribe(({workflowId}) => {
      this.workflowId = workflowId;
      this.workflowStage.getOptions('tblWorkflow', 'workflowId', 'title', 'workflowId', `${workflowId}`)
      .subscribe(([workflow]) => {
        this.workflowTitle = workflow.displayValue
      });
      this.dtTrigger.next();
    })
  }

  ajaxWorkflowStages(dTParams: any, callback: any) {
    this.workflowStage.getTableOptions(dTParams, 'tblWorkflowStage', 'workflowStageId', 'description', 'workflowStageId', 'workflowId', `${this.workflowId}`).subscribe(({records, totalRecords}) => {
      this.workflowStages = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteWorkflowStage(id: number) {
    this.workflowStage.deleteOption('tblWorkflow', 'workflowStageId', id).subscribe((res) => {
      if (res == 1) {
        this.workflowStages = this.workflowStages.filter(({workflowStageId}) => workflowStageId != id)
      }
    });
  }
}
