import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventDropArg } from '@fullcalendar/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/common';
import { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import FormData from 'src/assets/JSONs/FormData.json';
import Pikaday from 'pikaday';
import { SharedService } from '../shared/services/shared.service';
import { UserService } from '../shared/services/user.service';
import { CalendarService } from '../shared/services/calendar.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') Calendar!: FullCalendarComponent;
  @ViewChild('eventInCalender') eventInCalender!: TemplateRef<any>;
  Pikaday!: Pikaday;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private lookup: SharedService, private capitalize: TitleCasePipe, private user: UserService, private calendarSvc: CalendarService) { }

  calendarOptions!: CalendarOptions;
  FormData = FormData;
  modalType!: string;
  users: any[] = [];
  search!: string;

  searchEvents(search: string) {
    this.Calendar.getApi().removeAllEventSources();
    this.calendarSvc.getEventsBySearch(search, this.user.getUser.userId).subscribe((data) => {
      this.calendarOptions.eventSources = [data];
      this.Calendar.getApi().changeView('listMonth')
    })
  }

  eventForm!: FormGroup;
  eventFormInit() {
    this.eventForm = this.fb.group({
      userId: [0],
      caseId: [0],
      calendarId: [0],
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
      emialNotification: ['0'],
      // allDay: [false],
      eventScope: [null]
    });
  }
  ngOnInit(): void {
    this.eventFormInit();
    let pikadayConfig: Pikaday.PikadayOptions = {
      field: document.getElementById('datepicker'),
      firstDay: 1,
      minDate: new Date(2016, 0, 1),
      maxDate: new Date(2099, 12, 31),
      yearRange: [2016, 2025],
      format: 'yy-mm-dd',
      bound: false,
      onSelect: (dateString: Date) =>
        this.Calendar.getApi().gotoDate(dateString),
      container: document.getElementById('pickaday_container'),
    };
    this.Pikaday = new Pikaday(pikadayConfig);
    this.calendarOptions = {
      initialView: "timeGridDay",
      defaultTimedEventDuration: "00:30:00",
      firstDay: 1,
      // titleFormat: "ddd DD-MM-YYYY",
      editable: true,
      selectable: true,
      businessHours: false,

      dayMaxEvents: true,
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
      allDaySlot: false,
      eventSources: [],
      // selectAllow: function (start, end, jsEvent, view, resource) {
      //   alert(start.format()+','+ end.format()+','+ resource.id);
      // },
      dateClick: this.dateClick.bind(this),
      eventClick: this.eventClick.bind(this),
      eventDrop: this.eventDrop.bind(this),
      eventResize: this.eventResize.bind(this),
    };
    this.getEvents();
    this.users = [{ userId: this.user.getUser.userId, userName: this.user.getUser.name }];
    // this.lookup.getOptions('tblUser', 'UserId', 'Name').subscribe((users) => this.users = users);
  }

  getEvents() {
    this.calendarSvc.getEventsByUserId(this.user.getUser.userId).subscribe((data) => {
      this.calendarOptions.eventSources = [data];
    });
  }

  eventDrop({ event, delta }: EventDropArg) {
    var dragStartDate = this.toDate(event.start);
    var dragStartTime = this.toTime(event.start);
    if (event.end === null) {
      var dragEndDate = dragStartTime;
      var dragEndTime = dragStartTime;
    } else {
      var dragEndDate = this.toDate(event.end);
      var dragEndTime = this.toTime(event.end);
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
    //     event.source?.id,
    //   type: "POST",
    //   success: function (json) {
    //     if (json == "e1") {
    //       $("#myModalCalDrag").modal("show");
    //     }
    //   },
    // });
  };

  eventResize({ event }: EventResizeDoneArg) {
    var resizeStartDate = this.toDate(event.start);
    var resizeStartTime = this.toTime(event.start);
    if (event.end === null) {
      var resizeEndDate = resizeStartDate;
      var resizeEndTime = resizeStartTime;
    } else {
      var resizeEndDate = this.toDate(event.end);
      var resizeEndTime = this.toTime(event.end);
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
    //     event.source?.id,
    //   type: "POST",
    //   success: function (json) {
    //     if (json == "e1") {
    //       $("#myModalCalDrag").modal("show");
    //     }
    //   },
    // });
  };

  dateClick({ date, jsEvent, view }: DateClickArg) {
    this.modalType = 'add';
    var startDate = this.toDate(date);
    var startTime = this.toTime(date);
    this.eventForm.patchValue({
      startDate: startDate,
      startTime: startTime ? startTime : '00:00:00',
      endDate: startDate,
      endTime: startTime ? startTime : '00:00:00',
      // allDay: startTime == undefined
    });
    this.modalService.open(this.eventInCalender, { centered: true, scrollable: true }).result.finally(() => this.eventFormInit());
  };

  eventClick({ event: mainEvent, jsEvent, view }: EventClickArg) {
    this.modalType = 'edit';
    // const currentEvent: EventApi | undefined = this.Calendar.getApi().getEvents().find(({id}) => id == event.id);
    this.calendarSvc.getEventById(Number(mainEvent.id)).subscribe((event) => {
      console.log(event)
      this.eventForm.patchValue({
        userId: parseInt(<string>mainEvent.source?.id),
        calendarId: Number(mainEvent.id),
        ...event
      });
    })
    // this.updateDropdown(event?.allDay);
    this.modalService.open(this.eventInCalender, { centered: true, scrollable: true })
      .result.finally(() => this.eventFormInit());
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

    //       $("#myModalCalEdit").modal("show");
    //     }
    //   },
    // });
  };

  updateDropdown(allDay: boolean) {
    allDay ? (
      this.eventForm.controls.startTime.setValue('00:00:00'),
      this.eventForm.controls.startTime.disable(),
      this.eventForm.controls.endTime.setValue('00:00:00'),
      this.eventForm.controls.endTime.disable()
    ) : (
      this.eventForm.controls.startTime.enable(),
      this.eventForm.controls.endTime.enable()
    );
  };

  addEvent() {
    this.eventForm.dirty &&
      this.calendarSvc.addEvent({ ...this.eventForm.value, caseId: Number(this.eventForm.value.caseId), start: this.eventForm.value.startDate + (this.eventForm.value.startTime != '00:00:00' ? 'T' + this.eventForm.value.startTime : ''), end: this.eventForm.value.endDate + (this.eventForm.value.endTime != '00:00:00' ? 'T' + this.eventForm.value.endTime : ''), }).subscribe((res) => {
        if (res == '1') {
          this.Calendar.getApi().removeAllEventSources();
          this.getEvents();
          this.eventFormInit()
        }
      })
  };

  updateEvent() {
    console.log(this.eventForm.value)
    this.calendarSvc.updateEvent(this.eventForm.value).subscribe((res) => {
      if (res == 1) {
        this.Calendar.getApi().removeAllEventSources();
        this.getEvents();
      }
    })
  }

  toDate(date: any) {
    return moment(new Date(date)).format('YYYY-MM-DD')
  };

  toTime(date: any) {
    return moment(new Date(date)).format('HH:mm:ss')
  };
}