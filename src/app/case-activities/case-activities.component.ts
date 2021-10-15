import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'case-activities',
  templateUrl: './case-activities.component.html',
  styleUrls: ['./case-activities.component.scss']
})
export class CaseActivitiesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(({date}) => {
      this.date = date
      this.currentDate = moment(date, 'DD-MM-YYYY').toDate();
    });
    this.searchForm = this.fb.group({
      currentDate: [this.currentDate, Validators.required]
    })
  }
  searchForm!: FormGroup;
  date!: string;
  currentDate!: Date;
}
