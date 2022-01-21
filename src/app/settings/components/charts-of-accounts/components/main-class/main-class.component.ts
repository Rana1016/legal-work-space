import { Component, OnInit } from '@angular/core';
import { ChartsOfAccountsService } from "src/app/shared/services/charts-of-accounts.service";

@Component({
  selector: 'app-case-categories',
  templateUrl: './main-class.component.html',
  styleUrls: ['./main-class.component.scss']
})
export class MainClassComponent implements OnInit {
  constructor(private chartAccounts: ChartsOfAccountsService) { }
  mainClass!: any[];
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
        processing: 'Loading Classes...',
        emptyTable: 'No Class available.'
      },
      columns: [{
        title: 'Id',
        width: '150',
        data: 'mainClassId',
        orderable: true
      }, {
        title: 'Head',
        data: 'head',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxmainClass.bind(this)
    };
  }

  ajaxmainClass(dTParams: any, callback: any) {

    this.chartAccounts.getMainClasses(dTParams).subscribe(({records, totalRecords}) => {
      this.mainClass = records;
      console.log(this.mainClass);
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deletemainClass(id: number) {
    this.chartAccounts.deleteCaseCategory(id).subscribe((res) => {
      if (res == 1) {
        this.mainClass = this.mainClass.filter(({mainClassId}) => mainClassId != id)
      }
    });
  }
}
