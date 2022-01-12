import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TimeKeepCategoriesService } from 'src/app/shared/services/time-keep-categories.service';

@Component({
  selector: 'app-new-time-keep-category',
  templateUrl: './new-time-keep-category.component.html',
  styleUrls: ['./new-time-keep-category.component.scss']
})
export class NewTimeKeepCategoryComponent implements OnInit {
  constructor(private timeKeepCategory: TimeKeepCategoriesService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private lookup: SharedService) { }
  newCategoryForm!: FormGroup;
  edit?: number;
  categoryTitle!: string;
  ngOnInit(): void {
    this.newCategoryForm = this.fb.group({
      hourlyRateId: [0],
      title: [''],
    });
    this.route.params.subscribe(({ hourlyRateId }) => {
      this.edit = Number(hourlyRateId);
      this.timeKeepCategory.getTimeKeepCategoryById(hourlyRateId).subscribe((hourlyRate) => {
        this.newCategoryForm.patchValue(hourlyRate)
      });
    })
  }

  submitForm() {
    (!this.edit ?
      this.timeKeepCategory.addTimeKeepCategory(this.newCategoryForm.value)
      : this.timeKeepCategory.updateTimeKeepCategory(this.edit, this.newCategoryForm.value)
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}