import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NewCaseStepsService } from 'src/app/shared/services/new-case-steps.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private caseService: NewCaseStepsService) { }
  Cases: any;
  ngOnInit(): void {
    this.caseService.getData(1, 9).subscribe((data) => {
      this.Cases = data;
    })
  }
  toDate(date?: Date) {
    return moment(new Date).format('MM-DD-YYYY')
  }
}
