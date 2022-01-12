import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseCategoriesService } from 'src/app/shared/services/case-categories.service';

@Component({
  selector: 'app-new-case-category',
  templateUrl: './new-case-category.component.html',
  styleUrls: ['./new-case-category.component.scss']
})
export class NewCaseCategoryComponent implements OnInit {
  constructor(private caseCategory: CaseCategoriesService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  newCategoryForm!: FormGroup;
  edit?: number;
  ngOnInit(): void {
    this.newCategoryForm = this.fb.group({
      categoryCode: [''],
      categoryTitle: [''],
    });
    this.route.params.subscribe(({categoryId}) => {
      this.edit = Number(categoryId);
      this.caseCategory.getCaseCategoryById(this.edit).subscribe((caseCategory) => {
        this.newCategoryForm.patchValue(caseCategory)
      });
    })
  }

  submitForm() {
    (!this.edit ?
      this.caseCategory.addCaseCategory(this.newCategoryForm.value)
      : this.caseCategory.updateCaseCategory(this.edit, this.newCategoryForm.value)
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}
