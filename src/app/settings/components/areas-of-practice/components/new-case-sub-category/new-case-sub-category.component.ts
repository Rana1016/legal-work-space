import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseCategoriesService } from 'src/app/shared/services/case-categories.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-new-case-sub-category',
  templateUrl: './new-case-sub-category.component.html',
  styleUrls: ['./new-case-sub-category.component.scss']
})
export class NewCaseSubCategoryComponent implements OnInit {
  constructor(private caseSubCategory: CaseCategoriesService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private lookup: SharedService) { }
  newSubCategoryForm!: FormGroup;
  edit?: number;
  categoryTitle!: string;
  ngOnInit(): void {
    this.newSubCategoryForm = this.fb.group({
      categoryId: [0],
      subCategoryId: [0],
      subCategoryTitle: [''],
    });
    this.route.params.subscribe(({categoryId, subCategoryId}) => {
      this.caseSubCategory.getCaseCategoryById(categoryId).subscribe((caseCategory: any) => {
        this.categoryTitle = caseCategory.categoryTitle;
        this.newSubCategoryForm.patchValue({categoryId: Number(categoryId)});
      });
      subCategoryId && (this.edit = Number(subCategoryId));
      subCategoryId && this.lookup.getOptions('tblCaseSubcategory', 'SubCategoryId', 'SubCategoryTitle', 'SubCategoryId', `${subCategoryId}`).subscribe(([subCategory]) => {
        this.newSubCategoryForm.patchValue({
          subCategoryId: subCategory.keyValue,
          subCategoryTitle: subCategory.displayValue
        })
      });
    })
  }

  submitForm() {
    (!this.edit ?
      this.caseSubCategory.addCaseSubCategory(this.newSubCategoryForm.value)
      : this.caseSubCategory.updateCaseSubCategory(this.edit, this.newSubCategoryForm.value)
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}
