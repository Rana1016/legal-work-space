import { Component, EventEmitter, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-floating-timer',
  templateUrl: './floating-timer.component.html',
  styleUrls: ['./floating-timer.component.scss'],
})
export class FloatingTimerComponent implements OnInit {
  hours!: number;
  minutes!: number;
  seconds!: number;

  TimeOut?: any;
  isActive?: boolean;
  @ViewChild('AddTimeEntryForBilling') AddTimeEntryForBilling!: TemplateRef<any>;

  addTimeForm: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.addTimeForm = this.fb.group({
      caseId: [''],
      date: [moment(new Date).format('DD-MM-yyyy')],
      description: [''],
      category: [0],
      subCategory: [0],
      time: ['00:00:00'],
      type: 0
    });
  }
  ngOnInit(): void {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  playTimer() {
    this.isActive = true;
    this.setTimer();
  }

  pauseTimer() {
    this.isActive = false;
    this.clearTimer();
  }

  stopTimer() {
    this.pauseTimer();
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  submitTimer() {
    this.modalService.open(this.AddTimeEntryForBilling, {
      centered: true,
      scrollable: true
    })
  }

  updateTimer() {
    if (this.isActive) {
      this.seconds == 59
        ? this.minutes == 59
          ? (this.hours++, this.minutes = 0)
          : (this.minutes++, this.seconds = 0)
        : this.seconds++;
      this.setTimer();
      this.addTimeForm.patchValue({
        time: `${this.formatTime(this.hours)}:${this.formatTime(this.minutes)}:${this.formatTime(this.seconds)}`
      })
    }
  }

  formatTime(timeFrame: number) {
    return timeFrame.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  setTimer() {
    this.TimeOut = setTimeout(() => this.updateTimer(), 1000);
  }

  clearTimer() {
    clearTimeout(this.TimeOut);
  }

  categories = [
    { value: 0, label: "--Please Select--" },
    { value: 1, label: "-- Custom Rates" },
    { value: 2, label: "LA/S1 - Controlled Work 7(a) - Immigration and Asylum Escape Fee cases, Mental Health..." },
    { value: 3, label: "LA/S1 - Controlled Work 7(b) - Family and Housing (except as in Table 7(c)) and Miscellaneous (employment)" },
    { value: 4, label: "LA/S1 - Controlled Work 7(c) - Legal help in relation to a review under section 202 of the Housing Act 1996" },
    { value: 5, label: "LA/S1 - Controlled Work 7(d) - Immigration and Asylum hourly rates cases" },
    { value: 6, label: "LA/S1 - Controlled Work 7(e) - All other categories" },
    { value: 7, label: "LA/S1 - Controlled Work 8(a) - Immigration and Asylum – Escape Fee Cases" },
    { value: 8, label: "LA/S1 - Controlled Work 8(b) - Immigration and Asylum – Upper Tribunal Cases" },
    { value: 9, label: "LA/S1 - Controlled Work 8(c) - Immigration and Asylum – Other Hourly Rates Cases" },
    { value: 10, label: "LA/S1 - Controlled Work 8(d) - Representation in Mental Health Proceedings" },
    { value: 619, label: "LA/S1 - Licensed Work 10(a) - Work carried out with Schedule Authorisation (County Court)" },
    { value: 618, label: "LA/S1 - Licensed Work 10(a) - Work carried out with Schedule Authorisation (Higher Courts)" },
    { value: 620, label: "LA/S1 - Licensed Work 10(a) - Work carried out with Schedule Authorisation (Magistrates' Courts)" },
    { value: 621, label: "LA/S1 - Licensed Work 10(b) - Work not carried out with Schedule Authorisation (County Court)" },
    { value: 622, label: "LA/S1 - Licensed Work 10(b) - Work not carried out with Schedule Authorisation (Higher Courts)" },
    { value: 623, label: "LA/S1 - Licensed Work 10(b) - Work not carried out with Schedule Authorisation (Magistrates' Courts)" },
    { value: 624, label: "LA/S1 - Licensed Work 10(c) - First-tier Tribunal" },
    { value: 625, label: "LA/S1 - Licensed Work 11(a) - Family Mediation - Assessment Meetings" },
    { value: 952, label: "LA/S1 - Licensed Work 11(b) - Mediation Fees (Agreed Proposal)" },
    { value: 951, label: "LA/S1 - Licensed Work 11(b) - Mediation Fees (Multi Session)" },
    { value: 626, label: "LA/S1 - Licensed Work 11(b) - Mediation Fees (Single Session)" },
    { value: 627, label: "LA/S1 - Licensed Work 9(a) - Family Prescribed Rates (County Court)" },
    { value: 628, label: "LA/S1 - Licensed Work 9(a) - Family Prescribed Rates (Family Court)" },
    { value: 616, label: "LA/S1 - Licensed Work 9(a) - Family Prescribed Rates (Higher Courts)" },
    { value: 629, label: "LA/S1 - Licensed Work 9(b) - Other Family Proceedings (County Court)" },
    { value: 630, label: "LA/S1 - Licensed Work 9(b) - Other Family Proceedings (Family Court)" },
    { value: 617, label: "LA/S1 - Licensed Work 9(b) - Other Family Proceedings (Higher Courts)" },
    { value: 379, label: "LA/S2 - Remuneration of barristers in independent practice" },
    { value: 408, label: "LA/S3 - Family Advocacy Scheme 1(a) - Care or supervision proceedings (County Court)" },
    { value: 407, label: "LA/S3 - Family Advocacy Scheme 1(a) - Care or supervision proceedings (Family Court)" },
    { value: 409, label: "LA/S3 - Family Advocacy Scheme 1(a) - Care or supervision proceedings (High Court)" },
    { value: 411, label: "LA/S3 - Family Advocacy Scheme 1(b) - Other Public Law Case (County Court)" },
    { value: 410, label: "LA/S3 - Family Advocacy Scheme 1(b) - Other Public Law Case (Family Court)" },
    { value: 412, label: "LA/S3 - Family Advocacy Scheme 1(b) - Other Public Law Case (High Court)" },
    { value: 413, label: "LA/S3 - Family Advocacy Scheme 1(d) - Public Law" },
    { value: 415, label: "LA/S3 - Family Advocacy Scheme 2(a) - Private Law Children (County Court)" },
    { value: 414, label: "LA/S3 - Family Advocacy Scheme 2(a) - Private Law Children (Family Court)" },
    { value: 416, label: "LA/S3 - Family Advocacy Scheme 2(a) - Private Law Children (High Court)" },
    { value: 418, label: "LA/S3 - Family Advocacy Scheme 2(b) - Domestic Abuse (County Court)" },
    { value: 417, label: "LA/S3 - Family Advocacy Scheme 2(b) - Domestic Abuse (Family Court)" },
    { value: 419, label: "LA/S3 - Family Advocacy Scheme 2(b) - Domestic Abuse (High Court)" },
    { value: 420, label: "LA/S3 - Family Advocacy Scheme 2(c) - Private Law Finance (County Court)" },
    { value: 421, label: "LA/S3 - Family Advocacy Scheme 2(c) - Private Law Finance (Family Court)" },
    { value: 422, label: "LA/S3 - Family Advocacy Scheme 2(c) - Private Law Finance (High Court)" },
    { value: 423, label: "LA/S3 - Family Advocacy Scheme 2(e) - Private Law Children and Finance" },
    { value: 12, label: "LA/S4 - Inquests - Barrister rates" },
    { value: 11, label: "LA/S4 - Inquests - Provider Hourly Rates" },
    { value: 13, label: "LA/S5 - Experts' fees and rates" },
    { value: 14, label: "Solicitors' hourly rates" },
    { value: 1017, label: "test" },
  ]
}
