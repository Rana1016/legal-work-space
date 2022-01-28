import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import FormData from 'src/assets/JSONs/FormData.json';
import { CasesService } from 'src/app/shared/services/cases.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from 'src/app/shared/services/consultation.service';

@Component({
  selector: 'app-new-consultation',
  templateUrl: './new-consultation.component.html',
  styleUrls: ['./new-consultation.component.scss']
})
export class NewConsultationComponent implements OnInit {
  constructor(private fb: FormBuilder, private caseService: CasesService, private router: Router, private route: ActivatedRoute, private consultation: ConsultationService) { }
  newConsultationForm!: FormGroup;
  categories: any[] = [];
  subCategories: any[] = [];
  FormData = FormData;
  edit?: number;
  ngOnInit(): void {
    this.route.params.subscribe(({consultationId}) => {
      this.edit = Number(consultationId);
      this.consultation.getConsultationById(Number(consultationId)).subscribe((consultation) => {
        this.newConsultationForm.patchValue(consultation)
      });
    });
    this.newConsultationForm = this.fb.group({
      consultationDate: [new Date().toISOString()],
      consultationTime: ['00:00'],
      categories: [[]],
      subCategories: [[]],
      consultationId: [0],
      clientName: [''],
      phoneNumber: [''],
      email: [''],
      address: [''],
      caseSummary: [''],
      keyFacts: [''],
      adviceGiven: [''],
      chancesOfSuccess: ["0"],
      consultationFee: [''],
      isVatApplicable: ["0"],
      modeOfPayment: ["0"],
      caseFeeQouted: [''],
      qoutationExpiryDate: [new Date().toISOString()]
    });
    this.getCategories();
  };

  getCategories() {
    this.caseService.getCategories().subscribe((res) => {
      this.categories = res.filter(({ categoryId }: any) => categoryId !== 11);
    });
  }
  getSubCategories() {
    this.subCategories = [];
    if (this.newConsultationForm.value.categories.length == 0) {
      this.newConsultationForm.controls.subcategories?.reset()
    } else {
      this.caseService.getSubCategories(this.newConsultationForm.value.categories).subscribe((res) => {
        Object.keys(res).forEach((key, i) => {
          if (this.newConsultationForm.value.categories.includes(12)) {

            res[key] = res[key].filter(({ categoryId }: any) => categoryId !== 12)
            res[key] = res[key].filter(({ categoryId }: any) => categoryId !== 13)
          }
          if (i !== Object.keys(res).length - 1) {
            res[key] = res[key].filter((r: any) => r.subCategoryId !== 0)
          }
          this.subCategories = [...this.subCategories, ...res[key]]
        });
        let subIDs = this.subCategories.map(({ subCategoryId }) => subCategoryId);
        this.newConsultationForm.controls.subcategories
          .setValue(this.newConsultationForm.value.subcategories?.filter((subCategoryId: any) => subIDs.includes(subCategoryId)))
      })
    }
  }

  submitForm() {
    (!this.edit ?
      this.consultation.addConsultation(this.newConsultationForm.value)
      : this.consultation.updateConsultationById(this.edit, this.newConsultationForm.value)).subscribe(res => {
      res == 1 && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route })
    });
  }
}
