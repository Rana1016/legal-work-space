import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/cases.service';
import { UserService } from 'src/app/shared/services/user.service';
import FormData from 'src/assets/JSONs/FormData.json';

@Component({
  selector: 'app-edit-case-details',
  templateUrl: './edit-case-details.component.html',
  styleUrls: ['./edit-case-details.component.scss']
})
export class EditCaseDetailsComponent implements OnInit {
  caseId: number;
  editCaseDetailsForm!: FormGroup;
  FormData = FormData;
  categories: {
    categoryId: [];
    categoryTitle: [];
  }[] = [];
  subCategories: {
    categoryId: number;
    subCategoryId: number;
    subCategoryTitle: string;
  }[] = [];
  subCategoriesOffense: {
    categoryId: number;
    subCategoryId: number;
    subCategoryTitle: string;
  }[] = [];
  subCategoriesDescription: {
    categoryId: number;
    subCategoryId: number;
    subCategoryTitle: string;
  }[] = [];
  constructor(private fb: FormBuilder, private caseService: CasesService, private router: Router, private route: ActivatedRoute, private user: UserService) {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 3]);
  }
  ngOnInit(): void {
    this.editCaseDetailsForm = this.fb.group({
      clientInstructions: [""],
      categories: [[]],
      subcategories: [[]],
      subCategoriesDescription: [[]],
      subCategoriesOffense: [[]],
      lescoCase: [false],
      lescoType: [''],
      lescoGroup: this.fb.group({
        cloDivision: [''],
        cloSubDivision: [''],
        cloConsumerRef: [''],
        cloClerkName: [''],
        seCircle: ["0"],
        seDivision: [''],
        seSubDivision: [''],
        seConsumer: [''],
        seClerkName: ['']
      }),
      briefCaseDescription: [""],
      caseInstructions: [""],
      litigationCaseTitle: [""],
      dateOfLastHearing: [""],
      dateOfNextHearing: [""],
      filingDate: [""],
      courtCaseNumber: [""],
      adviceGivenToClient: [""],
      agreedPlanOfAction: [""],
      chancesOfSuccess: ["0"],
      weaknessesOfCase: [""],
      conflictsOfInterest: [""],
      conflictsOfInterestDesc: [""],
      haveCriminalConviction: [""],
      criminalConvictionDesc: [""],
      addtionalInfo: [""],
      isTemporary: [false],
      isMatter: [false],
      parentCaseId: [0],
      lastModifiedDate: [''],
      lastModifiedBy: [""],
    });
    this.caseService.cDObservable.subscribe((data) => {
      if (!!data) {
        this.getCategories();
        this.editCaseDetailsForm.patchValue({ ...data.caseDetail, categories: data.caseCategories.map((cC: any) => cC.categoryId), lastModifiedBy: this.user.getUser.userId, lastModifiedDate: new Date().toISOString() });
      } else {
        this.caseService.getCaseDetails(this.caseId).subscribe();
      }
    });
    this.editCaseDetailsForm.controls.categories.valueChanges.subscribe((data) => {if (!!data) {this.getSubCategories(data)}});
  }

  getCategories() {
    this.caseService.getCategories().subscribe((res) => {
      this.categories = res.filter(({ categoryId }: any) => categoryId !== 11);
    });
  }
  getSubCategories(categories: any[]) {
    this.subCategories = [];
    if (categories.length == 0) {
      this.editCaseDetailsForm.controls.subcategories?.reset()
    } else {
      this.caseService.getSubCategories(categories).subscribe((res) => {
        Object.keys(res).forEach((key, i) => {
          if (categories.includes(12)) {
            this.subCategoriesDescription = [...this.subCategoriesDescription, ...res[key].filter((r: any) => r.categoryId == 12)];
            this.subCategoriesOffense = [...this.subCategoriesOffense, ...res[key].filter((r: any) => r.categoryId == 13)];
            res[key] = res[key].filter(({ categoryId }: any) => categoryId !== 12)
            res[key] = res[key].filter(({ categoryId }: any) => categoryId !== 13)
          }
          if (i !== Object.keys(res).length - 1) {
            res[key] = res[key].filter((r: any) => r.subCategoryId !== 0)
          }
          this.subCategories = [...this.subCategories, ...res[key]]
        });
        let subIDs = this.subCategories.map(({ subCategoryId }) => subCategoryId);
        this.editCaseDetailsForm.controls.subcategories
          .setValue(this.editCaseDetailsForm.value.subcategories?.filter((subCategoryId: any) => subIDs.includes(subCategoryId)))
      })
    }
  }

  submitForm() {
    this.caseService.editCaseDetails(this.caseId,{ ...this.editCaseDetailsForm.value, lescoGroup: {...this.editCaseDetailsForm.value.lescoGroup, seCircle: Number(this.editCaseDetailsForm.value.lescoGroup.seCircle)}}).subscribe(res => {
      res == 1 && this.router.navigate(['..'], { relativeTo: this.route })
    });
  }
}
