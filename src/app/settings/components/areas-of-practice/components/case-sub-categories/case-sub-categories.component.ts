import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CaseCategoriesService } from 'src/app/shared/services/case-categories.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-case-sub-categories',
  templateUrl: './case-sub-categories.component.html',
  styleUrls: ['./case-sub-categories.component.scss']
})
export class CaseSubCategoriesComponent implements OnInit, AfterViewInit {
  constructor(private caseSubCategory: CaseCategoriesService, private lookup: SharedService, private route: ActivatedRoute) { }
  caseSubCategories!: any[];
  dtOptions!: DataTables.Settings;
  categoryId!: number;
  categoryTitle!: string;
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
        processing: 'Loading Sub-categories...',
        emptyTable: 'No Sub-categories available.'
      },
      columns: [{
        title: 'Title',
        data: 'displayValue',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      destroy: true,
      ajax: this.ajaxCaseCategories.bind(this)
    };
  };

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.route.params.subscribe(({categoryId}) => {
      this.categoryId = Number(categoryId);
      this.caseSubCategory.getCaseCategoryById(categoryId).subscribe((caseCategory: any) => {
        this.categoryTitle = caseCategory.categoryTitle;
      });
      this.dtTrigger.next();
    });
  }

  ajaxCaseCategories(dTParams: any, callback: any) {
    this.lookup.getTableOptions(dTParams, 'tblCaseSubcategory', 'SubCategoryId', 'SubCategoryTitle', 'SubCategoryId', 'CategoryId', `${this.categoryId}`).subscribe(({records, totalRecords}) => {
      this.caseSubCategories = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteCaseSubCategory(id: number) {
    this.lookup.deleteOption('tblCaseSubcategory', 'SubCategoryId', id).subscribe((res) => {
      if (res == 1) {
        this.caseSubCategories = this.caseSubCategories.filter(({subCategoryId}) => subCategoryId != id)
      }
    });
  }
}
