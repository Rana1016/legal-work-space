import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeKeepCategoriesService } from 'src/app/shared/services/time-keep-categories.service';

@Component({
  selector: 'app-new-time-keep-sub-category',
  templateUrl: './new-time-keep-sub-category.component.html',
  styleUrls: ['./new-time-keep-sub-category.component.scss']
})
export class NewTimeKeepSubCategoryComponent implements OnInit {
  constructor(private timeKeepCategory: TimeKeepCategoriesService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  newSubCategoryForm!: FormGroup;
  edit?: number;
  hourlyRateId!: number;
  hourlyRateTitle!: string;
  ngOnInit(): void {
    this.newSubCategoryForm = this.fb.group({
      hourlyRate: [''],
      title: [''],
      hourlyRateId: [0],
      hourlyRateDetailId: [0]
    });
    this.route.params.subscribe(({ hourlyRateId, hourlyRateDetailId }) => {
      this.hourlyRateId = Number(hourlyRateId);
      this.timeKeepCategory.getTimeKeepCategoryById(hourlyRateId).subscribe((hourlyRate: any) => {
        this.hourlyRateTitle = hourlyRate.title
      })
      !!hourlyRateDetailId && (this.edit = Number(hourlyRateDetailId), this.timeKeepCategory.getTimeKeepSubCategoryById(this.edit).subscribe((timeKeepSubCategory) => {
        this.newSubCategoryForm.patchValue(timeKeepSubCategory)
      }))
    })
  }

  submitForm() {
    (!this.edit ?
      this.timeKeepCategory.addTimeKeepSubCategory(this.newSubCategoryForm.value)
      : this.timeKeepCategory.updateTimeKeepSubCategory(this.edit, this.newSubCategoryForm.value)
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}
