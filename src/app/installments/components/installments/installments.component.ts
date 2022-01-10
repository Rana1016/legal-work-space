import { Component, OnInit } from '@angular/core';
import { InstallmentService } from 'src/app/shared/services/installment.service';

@Component({
  selector: 'app-sub-installments',
  templateUrl: './installments.component.html',
  styleUrls: ['./installments.component.scss']
})
export class InstallmentsComponent implements OnInit {
  constructor(private installment: InstallmentService) { }
  installments!: any[];
  title!: string;
  dtOptions!: DataTables.Settings;

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
        infoEmpty: '',
        emptyTable: 'No Installments available.'
      },
      columns: [{
        title: 'Contact groups',
        width: '700',
        data: '`title`',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxContactGroups.bind(this)
    };
  }

  ajaxContactGroups(dTParams: any, callback: any) {
    this.installment.getInstallments(dTParams, new Date().toISOString()).subscribe(({records, totalRecords}) => {
      this.installments = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    });
  }
}
