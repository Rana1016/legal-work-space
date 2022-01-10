import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { CasesService } from 'src/app/shared/services/cases.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class DefaultComponent implements OnInit, AfterViewInit {

  constructor(private caseService: CasesService, private route: ActivatedRoute, private fb: FormBuilder) { }
  Cases: any;
  totalCases!: number;
  dtOptions!: DataTables.Settings;
  dtTrigger: Subject<any> = new Subject();
  searchForm!: FormGroup;
  status?: string;

  ngOnInit(): void {
    this.route.params.subscribe(({status}) => {
      this.status = status;
    });
    this.searchForm = this.fb.group({
      search: [null]
    });
    this.dtOptions = {
      responsive: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: true,
      processing: true,
      ordering: true,
      info: true,
      autoWidth: false,
      searching: true,
      serverSide: true,
      pagingType: 'full_numbers',
      language: {
        emptyTable: 'No cases available.',
        processing: 'Loading Cases...'
      },
      columns: [{
        title: 'Date',
        data: 'date',
        width: '200',
        orderable: true
      }, {
        title: 'Case Ref',
        data: 'caseRef',
        width: '150',
        orderable: false,
        
      }, {
        title: 'Client Name',
        data: 'clientName',
        width: '250',
        orderable: false
      }, {
        title: 'Matter Description',
        data: 'matterDescription',
        width: '550',
        orderable: false
      }],
      destroy: true,
      ajax: this.ajaxCases.bind(this)
    };
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.searchForm.controls.search.valueChanges.subscribe(() => {
      this.dtTrigger.next();
    });
  }

  ajaxCases(dTParams: any, callback: any) {
    this.caseService.getCases(dTParams, this.searchForm.value.search, this.status).subscribe(({records, totalRecords}: any) => {
      this.Cases = records;
      this.totalCases = totalRecords;
      callback({
        recordsFiltered: totalRecords,
        recordsTotal: totalRecords 
      })
    })
  }
}
