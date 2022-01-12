import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-new-workflow-template',
  templateUrl: './new-workflow-template.component.html',
  styleUrls: ['./new-workflow-template.component.scss']
})
export class NewWorkflowTemplateComponent implements OnInit {
  constructor(private workflow: SharedService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  newWorkflowForm!: FormGroup;
  edit?: number;
  ngOnInit(): void {
    this.newWorkflowForm = this.fb.group({
      title: [''],
    });
    this.route.params.subscribe(({ workflowId }) => {
      workflowId && (this.edit = Number(workflowId));
      workflowId && this.workflow.getOptions('tblWorkflow', 'workflowId', 'title', 'workflowId', `${this.edit}`).subscribe(([workflow]) => {
        this.newWorkflowForm.patchValue({
          title: workflow.displayValue,
          workflowId: workflow.keyValue
        })
      });
    })
  }

  submitForm() {
    (!this.edit ?
      this.workflow.addOption('tblWorkflow', undefined, 'title', undefined, this.newWorkflowForm.value.title)
      : this.workflow.updateOption('tblWorkflow', 'workflowId', 'title', `${this.edit}`, this.newWorkflowForm.value.title)
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}