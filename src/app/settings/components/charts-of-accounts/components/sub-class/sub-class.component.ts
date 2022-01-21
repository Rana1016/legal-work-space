import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ChartsOfAccountsService } from 'src/app/shared/services/charts-of-accounts.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-case-sub-categories',
  templateUrl: './sub-class.component.html',
  styleUrls: ['./sub-class.component.scss']
})
export class SubClassComponent implements OnInit, AfterViewInit {
  constructor(private chartSubAccount: ChartsOfAccountsService, private lookup: SharedService, private route: ActivatedRoute) { }
  subClass!: any[];
  dtOptions!: DataTables.Settings;
  mainClassId!: number;
  head!: string;
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
        processing: 'Loading Sub-Classes...',
        emptyTable: 'No Sub-class available.'
      },
      columns: [{
        title: 'Title',
        data: 'head',
        orderable: true
      },
      {
        title: 'Main Class',
        data: 'mainClassHead',
        orderable: true
      },{
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      destroy: true,
      ajax: this.ajaxSubClasses.bind(this)
    };
  };

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.route.params.subscribe(({mainClassId}) => {
      this.mainClassId = Number(mainClassId);
      this.chartSubAccount.getCaseCategoryById(mainClassId).subscribe((mainClass: any) => {
        this.head = mainClass.head;
      });
      this.dtTrigger.next();
    });
  }

  ajaxSubClasses(dTParams: any, callback: any) {
    this.chartSubAccount.getSubClassesByMainClassId(dTParams, this.mainClassId).subscribe(({records, totalRecords}) => {
      this.subClass = records;
      console.log(this.subClass);

      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteCaseSubCategory(id: number) {
    this.lookup.deleteOption('tblSubClass', 'subClassId', id).subscribe((res) => {
      if (res == 1) {
        this.subClass = this.subClass.filter(({subClassId}) => subClassId != id)
      }
    });
  }
}
