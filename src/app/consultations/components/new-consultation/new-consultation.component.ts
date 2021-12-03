import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-new-consultation',
  templateUrl: './new-consultation.component.html',
  styleUrls: ['./new-consultation.component.scss'],
  providers: [{
    provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter
  }]
})
export class NewConsultationComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  consultationForm!: FormGroup;
  ngOnInit(): void {
    this.consultationForm = this.fb.group({
      consultationDate: [{ year: moment(new Date()).year(), month: moment(new Date()).month() + 1, day: moment().date() }],
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
  clog(h: any) {
    console.log(h)
  }
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
