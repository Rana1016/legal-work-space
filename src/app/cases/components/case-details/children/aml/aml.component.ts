import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AmlService } from 'src/app/shared/services/aml.service';

@Component({
  selector: 'app-aml',
  templateUrl: './aml.component.html',
  styleUrls: ['./aml.component.scss']
})
export class AmlComponent implements OnInit {
  constructor(private router: Router, private amlService: AmlService, private fb: FormBuilder) { }
  caseId!: number;
  amlListForm!: FormGroup;

  ngOnInit(): void {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
    this.amlListForm = this.fb.group({
      amlCheckList: this.fb.array([])
    });
    this.initializeAML();
  }

  initializeAML() {
    this.amlService.getAmlCheckListById(this.caseId).subscribe((AmlCheckList) => {
      AmlCheckList.forEach(({amlCheckPoint, ifChecked, id}, i) => {
        (<FormArray>this.amlListForm.controls.amlCheckList).push(
          this.fb.group({
            ifChecked: [ifChecked],
            amlCheckPoint: [amlCheckPoint],
            id: [id]
          })
        );
        (<FormArray>this.amlListForm.controls.amlCheckList).controls[i].valueChanges.subscribe(({ifChecked, id}) => {
          this.amlService.checkAmlCheckPoint(id, ifChecked).subscribe((res) => res == true && console.log('Done'))
        })
      });
    })
  }
}
