import { Component, OnInit } from '@angular/core';
import { CaseCategoriesService } from 'src/app/shared/services/case-categories.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-case-categories',
  templateUrl: './case-categories.component.html',
  styleUrls: ['./case-categories.component.scss']
})
export class CaseCategoriesComponent implements OnInit {
  constructor(private caseCategory: CaseCategoriesService) { }
  caseCategories!: any[];
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
        processing: 'Loading Categories...',
        emptyTable: 'No Categories available.'
      },
      columns: [{
        title: 'Code',
        width: '150',
        data: 'categoryCode',
        orderable: true
      }, {
        title: 'Title',
        data: 'categoryTitle',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxCaseCategories.bind(this)
    };
  }

  ajaxCaseCategories(dTParams: any, callback: any) {
    this.caseCategory.getCaseCategories(dTParams).subscribe(({records, totalRecords}) => {
      this.caseCategories = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteCaseCategory(id: number) {
    this.caseCategory.deleteCaseCategory(id).subscribe((res) => {
      if (res == 1) {
        this.caseCategories = this.caseCategories.filter(({categoryId}) => categoryId != id)
      }
    });
  }
}
