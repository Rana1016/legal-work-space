import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-new-stage',
  templateUrl: './new-stage.component.html',
  styleUrls: ['./new-stage.component.scss']
})
export class NewStageComponent implements OnInit {
  constructor(private workflowStage: SharedService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  newStageForm!: FormGroup;
  edit?: number;
  workflowId!: number;
  workflowTitle!: string;
  dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.newStageForm = this.fb.group({
      description: [undefined],
      workflowId: [0],
      workflowStageId: [0]
    });
    this.route.params.subscribe(({ workflowId, workflowStageId }) => {
      this.workflowId = Number(workflowId);
      this.workflowStage.getOptions('tblWorkflow', 'workflowId', 'title', 'workflowId', `${workflowId}`)
      .subscribe(([workflow]) => {
        this.workflowTitle = workflow.displayValue
      });
      !!workflowStageId && (this.edit = Number(workflowStageId), this.workflowStage.getOptions('tblWorkflowStage', 'workflowStageId', 'description', 'workflowStageId', `${this.edit}`).subscribe(([workflowStage]) => {
        this.newStageForm.patchValue({
          description: workflowStage.displayValue,
          workflowStageId,
          workflowId
        })
      }))
    })
  }

  submitForm() {
    (!this.edit ?
      this.workflowStage.addOption('tblWorkflowStage', 'workflowId', 'description', `${this.workflowId}`, this.newStageForm.value.description)
      : this.workflowStage.updateOption('tblWorkflowStage', 'workflowStageId', 'description', `${this.edit}`, this.newStageForm.value.description)
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}
