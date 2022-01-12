import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { VatRateService } from 'src/app/shared/services/vat-rate.service';

@Component({
  selector: 'app-vat-rates',
  templateUrl: './vat-rates.component.html',
  styleUrls: ['./vat-rates.component.scss']
})
export class VatRatesComponent implements OnInit {
  constructor(private vatRate: VatRateService) { }
  vatRates!: any[];
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
        processing: 'Loading VAT Rates...',
        emptyTable: 'No VAT Rates available.'
      },
      columns: [{
        title: 'Rate',
        width: '150',
        data: 'vatRatePercentage',
        orderable: true
      }, {
        title: 'Title',
        data: 'title',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxVatRates.bind(this)
    };
  }

  ajaxVatRates(dTParams: any, callback: any) {
    this.vatRate.getVatRates(dTParams).subscribe(({records, totalRecords}) => {
      this.vatRates = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteVatRate(id: number) {
    this.vatRate.deleteVatRate(id).subscribe((res) => {
      if (res == 1) {
        this.vatRates = this.vatRates.filter(({vatRateId}) => vatRateId != id)
      }
    });
  }
}
