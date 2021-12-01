import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/common';
import { DateClickArg } from '@fullcalendar/interaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Pikaday from 'pikaday';
import FormData from 'src/assets/JSONs/FormData.json';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') Calendar!: FullCalendarComponent;
  @ViewChild('addEventToCalender') addEventToCalender!: TemplateRef<any>;
  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  calendarOptions!: CalendarOptions;
  FormData = FormData;

  addEventForm!: FormGroup;

  ngOnInit(): void {
    this.addEventForm = this.fb.group({
      calendar: [0],
      caseId: [''],
      title: [''],
      personName: [''],
      email: [''],
      contact: [''],
      location: [''],
      description: [''],
      startDate: [''],
      startTime: ['00:00:00'],
      endDate: [''],
      endTime: ['00:00:00'],
      emailNotificationTime: [0],
      allDay: [false],
      eventType: [null]
    });
    let pikadayConfig = {
      field: document.getElementById('datepicker'),
      firstDay: 1,
      minDate: new Date(2016, 0, 1),
      maxDate: new Date(2022, 12, 31),
      yearRange: [2016, 2022],
      format: 'yy-mm-dd',
      bound: false,
      onSelect: (dateString: Date) =>
        this.Calendar.getApi().gotoDate(dateString),
      container: document.getElementById('pickaday_container'),
    };
    let pikaday = new Pikaday(pikadayConfig);
    this.calendarOptions = {
      defaultTimedEventDuration: '00:30:00',
      firstDay: 1,
      editable: true,
      selectable: true,
      businessHours: false,
      // businessHours: {
      //     dow: [ 1, 2, 3, 4, 5, 6, 7 ], // Monday - Sunday
      //     start: '23:45', // a start time (10am in this example)
      //     end: '23:59', // an end time (6pm in this example)
      // },
      views: {
        agendaTwoDay: {
          type: 'agenda',
          duration: { days: 2 },
          groupByResource: true,
          //// uncomment this line to group by day FIRST with resources underneath
          //groupByDateAndResource: true
        },
      },

      //// uncomment this line to hide the all-day slot
      // allDaySlot: false,
      events: [
        {
          id: '1',
          resourceId: '4001',
          start: '2021-08-12',
          end: '2021-08-12',
          title: 'Johni Lever - Mr. Supervisor',
        },
        {
          id: '2',
          resourceId: '4001',
          start: '2021-09-30T07:00:00',
          end: '2021-09-30T09:30:00',
          title: 'etst - test',
        },
        {
          id: '3',
          resourceId: '4001',
          start: '2021-09-30',
          end: '2021-09-30',
          title: 'tahir hussain - etest',
        },
        {
          id: '5',
          resourceId: '4001',
          start: '2021-10-09T14:30:00',
          end: '2021-10-09T15:00:00',
          title: 'test - test',
        },
      ],
      dateClick: this.dateClick.bind(this),
      eventClick: this.eventClick.bind(this)
    };
  }

  dateClick({dateStr}: DateClickArg) {
    this.modalService.open(this.addEventToCalender)
  }

  eventClick({event}: EventClickArg) {
    console.log(event)
  }
}