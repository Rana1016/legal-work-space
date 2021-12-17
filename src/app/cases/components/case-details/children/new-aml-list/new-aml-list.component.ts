import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseDetailService } from 'src/app/shared/services/case-detail.service';

@Component({
  selector: 'app-new-aml-list',
  templateUrl: './new-aml-list.component.html',
  styleUrls: ['./new-aml-list.component.scss']
})
export class NewAmlListComponent implements OnInit {
  caseId: number;
  newAmlListForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private caseDetailService: CaseDetailService, private route: ActivatedRoute) {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 3]);
    this.newAmlListForm = this.fb.group({
      amlCheckList: this.fb.array([
        this.fb.group({
          amlCheckPoint: [''],
          ifChecked: [false],
          caseId: this.caseId,
          id: 0
        })
      ])
    });
  }

  ngOnInit(): void {

  }

  addAMLCheckPoint() {
    (<FormArray>this.newAmlListForm.controls.amlCheckList).push(this.fb.group({
      amlCheckPoint: [''],
      ifChecked: [false],
      caseId: this.caseId,
      id: 0
    }));
  }
  submitForm() {
    this.caseDetailService.addNewAmlCheckList(this.newAmlListForm.value.amlCheckList).subscribe((data) => {
      data == true && this.router.navigate(['..'], { relativeTo: this.route })
    });
  }
}
