import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConsultationService } from '../shared/services/consultation.service';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent implements OnInit, AfterViewInit {
  constructor(private consultation: ConsultationService, private router: Router) { }
  consultations!: any[];
  title!: string;
  dtOptions!: DataTables.Settings;
  startDate: string = new Date().toISOString();
  endDate: string = new Date().toISOString();
  searchMethod: string = "0";
  search = '';
  dtTrigger: Subject<any> = new Subject();

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      serverSide: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: true,
      processing: true,
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      language: {
        processing: 'Loading Consultations...',
        emptyTable: 'No Consultations available.'
      },
      columns: [{
        title: 'Date & Time',
        width: '700',
        data: 'consultationDate',
        orderable: true
      }, {
        title: 'Client Name',
        width: '700',
        data: 'clientName',
        orderable: false
      }, {
        title: 'Category',
        width: '700',
        data: 'categories',
        orderable: false
      }, {
        title: 'Email',
        width: '700',
        data: 'email',
        orderable: false
      }, {
        title: 'Address',
        width: '700',
        data: 'address',
        orderable: false
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      destroy: true,
      ajax: this.ajaxConsultations.bind(this)
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  onSubmit() {
    this.dtTrigger.next();
  }

  ajaxConsultations(dTParams: any, callback: any) {
    (this.searchMethod == '0' ?
    this.consultation.getAll(dTParams)
    : this.consultation.getByDateRange(this.startDate, this.endDate, dTParams)).subscribe(({records, totalRecords}) => {
      this.consultations = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    });
  }

  deleteConsultation(id: number) {
    this.consultation.deleteConsultation(id).subscribe((res) => {
      if (res == 1) {
        this.consultations = this.consultations.filter(({consultationId}) => consultationId != id)
      }
    });
  }

  convertToCase(id: number) {
    this.consultation.convertToCase(id).subscribe((res) => {
      if (res == 1) {
        this.consultations = this.consultations.filter(({consultationId}) => consultationId != id);
        this.router.navigate(['/cases']);
      };
    })
  }
}