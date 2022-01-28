import { Component, EventEmitter, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CasesService } from '../../services/cases.service';
import { SharedService } from '../../services/shared.service';
import { TimeKeepingService } from '../../services/time-keeping.service';
import { VatRateService } from '../../services/vat-rate.service';

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
  vatRates!: any[];

  TimeOut?: any;
  timerModal: any;
  isActive?: boolean;
  @ViewChild('AddTimeEntryForBilling') AddTimeEntryForBilling!: TemplateRef<any>;

  addTimeForm: FormGroup;
  dateCreatedOnly: string;
  isValid?: boolean = true;
  clientName?: string = "";
  searchId = '';
  constructor(private modalService: NgbModal, 
    private fb: FormBuilder, 
    private timeKeep: TimeKeepingService,
    private lookup: SharedService, 
    private vatRate: VatRateService,
    private caseService: CasesService) {
    this.dateCreatedOnly = new Date().toISOString().split('T')[0];
    console.log(this.dateCreatedOnly);
    this.addTimeForm = this.fb.group({
      caseId: [''],
      dateCreated: [new Date().toISOString()],
      description: [""],
      categoryId: ["0"],
      subCategoryId: ["0"],
      inclusiveVat: ["0"],
      vatRate: [null],
      timeSpent: ["00:00:00"],
      type: ["0"]
    });
  }
  ngOnInit(): void {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    // this.vatRate.getVatRates(szq)
    this.timeKeep.modalOpen.subscribe((timeKeepId) => {
      console.log(timeKeepId);
      
      if (timeKeepId != null) {
        this.timeKeep.getTimeKeepById(timeKeepId).subscribe((data) => {
          console.log(data, 'time keeping');
          
          this.addTimeForm.patchValue(data);
          this.modalInit();
        })
      } else {
        
      }
    });
    this.vatRate.getAll().subscribe(data => {
      this.vatRates = data;
      this.addTimeForm.patchValue({
        vatRate: `${data[0].keyValue}`
      })
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
    return this.lookup.getOptions('tblHourlyRate', 'hourlyRateId', 'Title').subscribe((categories) =>  this.categories = categories);
  }

  getSubCategories(hourlyRate: any) {
    return this.lookup.getOptions('tblHourlyRateDetail', 'hourlyRateDetailId', 'Title', 'hourlyRateId', `${this.addTimeForm.value.categoryId}`).subscribe((subCategories) =>  this.subCategories = subCategories);
  }

  checkCase(caseId: string | number) {
    if ((<string>caseId).length >= 4) {
      caseId = Number(caseId)
      this.caseService.isValid(caseId).subscribe(({ message, clientName }: any) => {
        this.clientName = clientName;
        this.isValid = message == undefined
      })
    } else {
      this.isValid = true;
      this.clientName = "";
    }
  }
}
