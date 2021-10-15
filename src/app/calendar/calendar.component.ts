import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') Calendar!: FullCalendarComponent;

  constructor() { }

  calendarOptions!: CalendarOptions;

  ngOnInit(): void {
    this.calendarOptions = {
      defaultTimedEventDuration: "00:30:00",
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
          type: "agenda",
          duration: { days: 2 },
          groupByResource: true,
          //// uncomment this line to group by day FIRST with resources underneath
          //groupByDateAndResource: true
        },
      },

      //// uncomment this line to hide the all-day slot
      //allDaySlot: false,
      events: [
        {
          id: "1",
          resourceId: "4001",
          start: "2021-08-12",
          end: "2021-08-12",
          title: "Johni Lever - Mr. Supervisor",
        },
        {
          id: "2",
          resourceId: "4001",
          start: "2021-09-30T07:00:00",
          end: "2021-09-30T09:30:00",
          title: "etst - test",
        },
        {
          id: "3",
          resourceId: "4001",
          start: "2021-09-30",
          end: "2021-09-30",
          title: "tahir hussain - etest",
        },
        {
          id: "5",
          resourceId: "4001",
          start: "2021-10-09T14:30:00",
          end: "2021-10-09T15:00:00",
          title: "test - test",
        },
      ],
      
      // select: function (start, end, jsEvent, view, resource) {
      //   //alert(start.format()+','+ end.format()+','+ resource.id);
      // },
    }
  }

  t() {
    console.log(this.Calendar)
  }

}
