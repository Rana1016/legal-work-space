import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-new-consultation',
  templateUrl: './new-consultation.component.html',
  styleUrls: ['./new-consultation.component.scss']
})
export class NewConsultationComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  consultationForm!: FormGroup;
  ngOnInit(): void {
    this.consultationForm = this.fb.group({
      consultationDate: [moment(new Date()).format('DD-MM-yyyy')],
      consultationTime: [''],
      categories: [[]],
      subcategories: [[]],
      name: [''],
      phoneNumber: [''],
      email: [''],
      address: [''],
      caseSummary: [''],
      keyFacts: [''],
      adviceGiven: [''],
      chancesOfSuccess: [0],
      consultationFee: [''],
      isVATApplicable: [0],
      modeOfPayment: [0],
      caseFeeQuoted: [''],
      quotationExpiryDate: ['']
    })
  };
  categories = [
    { categoryId: 0, categoryTitle: "--Please Select--" },
    { categoryId: 1, categoryTitle: "Civil Litigation" },
    { categoryId: 2, categoryTitle: "Consumer Law" },
    { categoryId: 3, categoryTitle: "Criminal Law" },
    { categoryId: 4, categoryTitle: "Employment Law" },
    { categoryId: 5, categoryTitle: "Family Law" },
    { categoryId: 6, categoryTitle: "Human Rights" },
    { categoryId: 7, categoryTitle: "Immigration & Asylum" },
    { categoryId: 8, categoryTitle: "Personal injury & clinical negligence" },
    { categoryId: 9, categoryTitle: "Housing Law (Property & Conveyancing)" },
  ]

}
