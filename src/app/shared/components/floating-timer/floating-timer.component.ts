import { Component, EventEmitter, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SharedService } from '../../services/shared.service';
import { TimeKeepingService } from '../../services/time-keeping.service';

@Component({
  selector: 'app-floating-timer',
  templateUrl: './floating-timer.component.html',
  styleUrls: ['./floating-timer.component.scss'],
})
export class FloatingTimerComponent implements OnInit {
  hours!: number;
  minutes!: number;
  seconds!: number;
  categories!: any[];
  subCategories!: any[];

  TimeOut?: any;
  timerModal: any;
  isActive?: boolean;
  @ViewChild('AddTimeEntryForBilling') AddTimeEntryForBilling!: TemplateRef<any>;

  addTimeForm: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private timeKeep: TimeKeepingService, private lookup: SharedService) {
    this.addTimeForm = this.fb.group({
      caseId: [''],
      dateCreated: [new Date().toISOString()],
      description: [""],
      categoryId: ["0"],
      subCategoryId: ["0"],
      inclusiveVat: ["0"],
      vatRate: ["1"],
      timeSpent: ["00:00:00"],
      type: ["0"]
    });
  }
  ngOnInit(): void {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timeKeep.modalOpen.subscribe((timeKeepId) => {
      if (timeKeepId != null) {
        this.timeKeep.getTimeKeepById(timeKeepId).subscribe((data) => {
          this.addTimeForm.patchValue(data);
          this.modalInit();
        })
      } else {
        
      }
    })
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

  modalInit() {
    this.getCategories();
    this.addTimeForm.controls.categoryId.valueChanges.subscribe((categoryId) => {
      this.getSubCategories(Number(categoryId));
    })
    this.timerModal = this.modalService.open(this.AddTimeEntryForBilling, {
      centered: true,
      scrollable: true
    });
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
        timeSpent: `${this.formatTime(this.hours)}:${this.formatTime(this.minutes)}:${this.formatTime(this.seconds)}`
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

  addTime() {
    this.timeKeep.addTime({...this.addTimeForm.value, caseId: Number(this.addTimeForm.value.caseId)}).subscribe((res) => {
      if (res == 1) {
        this.timerModal.close();
        this.addTimeForm.reset();
      }
    })
  }

  getCategories() {
    return this.lookup.getOptions('tblTimeKeepCategory', 'timeKeepCategoryId', 'Title').subscribe((categories) =>  this.categories = categories);
  }

  getSubCategories(categoryId: number) {
    return this.lookup.getOptions('tblTimeKeepSubCategory', 'timeKeepSubCategoryId', 'Title', 'timeKeepCategoryId', categoryId).subscribe((subCategories) =>  this.subCategories = subCategories);
  }
}
