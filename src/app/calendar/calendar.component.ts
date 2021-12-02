import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/common';
import { DateClickArg } from '@fullcalendar/interaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
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
      initialView: "timeGridDay",
      // defaultDate: "2021-10-15",
      defaultTimedEventDuration: "00:30:00",
      firstDay: 1,
      titleFormat: "ddd DD-MM-YYYY",
      editable: true,
      selectable: true,
      businessHours: false,

      dayMaxEvents: true,
      // eventLimit: true, // allow "more" link when too many events
      headerToolbar: {
        start: "prev,next today",
        center: "title",
        end: "timeGridDay,timeGridWeek,dayGridMonth,listMonth",
      },
      /*
    businessHours: {
        dow: [ 1, 2, 3, 4, 5, 6, 7 ], // Monday - Sunday
        start: '23:45', // a start time (10am in this example)
        end: '23:59', // an end time (6pm in this example)
    },
    */
      views: {
        timeGridTwoDay: {
          type: "timeGrid",
          duration: { days: 2 },
          buttonText: "2 Days",
          // views that are more than a day will NOT do this behavior by default
          // so, we need to explicitly enable it
          groupByResource: true,

          //// uncomment this line to group by day FIRST with resources underneath
          //groupByDateAndResource: true
        },
      },

      //// uncomment this line to hide the all-day slot
      // allDaySlot: false,
      eventSources: [
        { id: "4001" }
      ],
      // resources: [
      //   { id: "4001", title: "Dr. Mazhar Ilahi", eventColor: "#78B41E" },
      // ],
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
      //   alert(start.format()+','+ end.format()+','+ resource.id);
      // },
      dateClick: this.dateClick.bind(this),
      eventClick: function ({event, jsEvent, view}: any) {
        console.log({event, jsEvent, view});
        //$('#myModalCalClick').modal('show');
        // $.ajax({
        //   url: "https://crescent.legalworkspace.co.uk/index.php/cms/secure/calendar/ajax/get-edit",
        //   data: "inpID=" + event.id,
        //   type: "POST",
        //   success: function (json) {
        //     if (json == "e1") {
        //       $("#myModalCalClick").modal("show");
        //       return;
        //     } else {
        //       var ajax_result = json;
        //       var arr_ajax_result = ajax_result.split(";;--**");
        //       var cal_event_id = arr_ajax_result[1];
        //       var cal_event_pid = arr_ajax_result[2];
        //       var cal_event_owner = arr_ajax_result[3];
        //       var cal_event_title = arr_ajax_result[4];
        //       var cal_event_contact = arr_ajax_result[5];
        //       var cal_event_location = arr_ajax_result[6];
        //       var cal_event_details = arr_ajax_result[11];
        //       var cal_event_allday = arr_ajax_result[12];
        //       var cal_event_private = arr_ajax_result[13];
        //       var cal_event_sdate = arr_ajax_result[7];
        //       var cal_event_edate = arr_ajax_result[8];
        //       var cal_event_stime = arr_ajax_result[9];
        //       var cal_event_etime = arr_ajax_result[10];
        //       var cal_event_access = arr_ajax_result[14];
        //       var cal_event_modified = arr_ajax_result[15];
        //       var cal_event_reminder = arr_ajax_result[16];
        //       var cal_event_cname = arr_ajax_result[17];
        //       var cal_event_cemail = arr_ajax_result[18];
        //       $("#cal_ajx").text("");

        //       if (cal_event_private == 1 && cal_event_owner != 4001) {
        //         $("#myModalCalClick").modal("show");
        //         return;
        //       }
        //       if (cal_event_access == 0 && cal_event_owner != 4001) {
        //         $("#myModalCalClick").modal("show");
        //         return;
        //       }
        //       if (cal_event_access == 1) {
        //         $("#read_title").text(cal_event_title);
        //         $("#read_contact").text(cal_event_contact);
        //         $("#read_location").text(cal_event_location);
        //         $("#read_details").text(cal_event_details);
        //         $("#read_cname").text(cal_event_cname);
        //         $("#read_cemail").text(cal_event_cemail);
        //         $("#modified_details").text(
        //           "Last modified: " + cal_event_modified
        //         );
        //         $("#myModalCalReadonly").modal("show");
        //         return;
        //       }

        //       $("#inptCAL").val(cal_event_owner).change();

        //       $("#inptCAL_TITLE").val(cal_event_title);
        //       $("#inptCAL_PNAME").val(cal_event_cname);
        //       $("#inptCAL_PEMAIL").val(cal_event_cemail);
        //       $("#inptCAL_CONTACT").val(cal_event_contact);
        //       $("#inptCAL_LOCATION").val(cal_event_location);
        //       $("#inptCAL_DETAILS").val(cal_event_details);
        //       $("#inptEVENT_ID").val(cal_event_id);
        //       $("#inptEVENT_OWNER").val(cal_event_owner);
        //       $("#modified_by").text("Last modified: " + cal_event_modified);

        //       var link =
        //         "https://crescent.legalworkspace.co.uk/index.php/cms/secure/calendar/default/" +
        //         cal_event_sdate +
        //         "/del-event/" +
        //         cal_event_id +
        //         "/";
        //       $("#del_link").attr("href", link);

        //       $("#inptCAL_STIME").val(cal_event_stime).change();
        //       $("#inptCAL_ETIME").val(cal_event_etime).change();
        //       $("#inptREMINDER").val(cal_event_reminder).change();

        //       $(
        //         "input[name=inptPRIVATE][value=" + cal_event_private + "]"
        //       ).prop("checked", true);

        //       $("#inptCAL_SDATE").val(cal_event_sdate);
        //       $("#inptCAL_EDATE").val(cal_event_edate);
        //       $("#inptCAL_SDATE").datepicker("setValue", cal_event_sdate);
        //       $("#inptCAL_EDATE").datepicker("setValue", cal_event_edate);

        //       if (cal_event_allday == 1) {
        //         $("#inptCAL_ALLDAY").prop("checked", true);
        //         $("#inptCAL_ALLDAY").prettyCheckable("check");
        //         $(change_dropdown);
        //         $("#inptCAL_ALLDAY").change(change_dropdown);
        //       } else {
        //         $("#inptCAL_ALLDAY").prop("checked", false);
        //         $("#inptCAL_ALLDAY").prettyCheckable("uncheck");
        //         $(change_dropdown);
        //         $("#inptCAL_ALLDAY").change(change_dropdown);
        //       }

        //       $("#myModalCalEdit").modal("show");
        //     }
        //   },
        // });
      },
      eventDrop: function ({event, delta}: any) {
        var dragStartDate = moment(event.start).format("YYYY-MM-DD");
        var dragStartTime = moment(event.start).format("HH:mm:ss");
        if (event.end === null) {
          var dragEndDate = dragStartTime;
          var dragEndTime = dragStartTime;
        } else {
          var dragEndDate = moment(event.end).format("YYYY-MM-DD");
          var dragEndTime = moment(event.end).format("HH:mm:ss");
        }

        // $.ajax({
        //   url: "https://crescent.legalworkspace.co.uk/index.php/cms/secure/calendar/ajax/drag",
        //   data:
        //     "inpCAL_SDATE=" +
        //     drg_sdate +
        //     "&inpCAL_STIME=" +
        //     drg_stime +
        //     "&inpCAL_EDATE=" +
        //     drg_edate +
        //     "&inpCAL_ETIME=" +
        //     drg_etime +
        //     "&inpID=" +
        //     event.id +
        //     "&inpCAL=" +
        //     event.resourceId,
        //   type: "POST",
        //   success: function (json) {
        //     if (json == "e1") {
        //       $("#myModalCalDrag").modal("show");
        //     }
        //   },
        // });
      },
      eventResize: function ({event}: any) {
        var resizeStartDate = moment(event.start).format("YYYY-MM-DD");
        var resizeStartTime = moment(event.start).format("HH:mm:ss");
        if (event.end === null) {
          var resizeEndDate = resizeStartDate;
          var resizeEndTime = resizeStartTime;
        } else {
          var resizeEndDate = moment(event.end).format("YYYY-MM-DD");
          var resizeEndTime = moment(event.end).format("HH:mm:ss");
        }

        // $.ajax({
        //   url: "https://crescent.legalworkspace.co.uk/index.php/cms/secure/calendar/ajax/drag",
        //   data:
        //     "inpCAL_SDATE=" +
        //     resizeStartDate +
        //     "&inpCAL_STIME=" +
        //     resizeStartTime +
        //     "&inpCAL_EDATE=" +
        //     resizeEndDate +
        //     "&inpCAL_ETIME=" +
        //     resizeEndTime +
        //     "&inpID=" +
        //     event.id +
        //     "&inpCAL=" +
        //     event.resourceId,
        //   type: "POST",
        //   success: function (json) {
        //     if (json == "e1") {
        //       $("#myModalCalDrag").modal("show");
        //     }
        //   },
        // });
      },
  };
}

  dateClick(a: DateClickArg) {
    console.log(a)
    this.modalService.open(this.addEventToCalender)
  }

  eventClick({event}: EventClickArg) {
    console.log(event)
  }
}