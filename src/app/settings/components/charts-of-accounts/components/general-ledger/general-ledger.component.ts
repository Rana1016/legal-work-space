import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ChartsOfAccountsService } from 'src/app/shared/services/charts-of-accounts.service';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.scss']
})
export class GeneralLedgerComponent implements OnInit, AfterViewInit {
  constructor(private chartSubAccount: ChartsOfAccountsService, private lookup: SharedService, private route: ActivatedRoute) { }
  generalLedger!: any[];
  dtOptions!: DataTables.Settings;
  mainClassId!: number;
  head!: string;
  dtTrigger: Subject<any> = new Subject();
  subClassId!: number;
  mainHead!: string;

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
        processing: 'Loading General-Ledger...',
        emptyTable: 'No General-Ledger available.'
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
        },
        {
          title: 'Sub Class',
          data: 'subClassHead',
          orderable: true
        },
        {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      destroy: true,
      ajax: this.ajaxgeneralLedger.bind(this)
    };
  };

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.route.params.subscribe(({subClassId}) => {
      this.subClassId = Number(subClassId);
      this.chartSubAccount.getSubClassById(subClassId).subscribe((subClassId: any) => {
        this.head = subClassId.head;
        this.mainHead = subClassId.mainClassHead;
      });
      this.dtTrigger.next();
    });
  }

  ajaxgeneralLedger(dTParams: any, callback: any) {
    this.chartSubAccount.getGeneralLedgerBySubClassesId(dTParams, this.subClassId).subscribe(({records, totalRecords}) => {
      this.generalLedger = records;
      // console.log(this.subClass);

      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
      })
    });
  }

  deleteCaseSubCategory(id: number) {
    this.lookup.deleteOption('tblgeneralLedger', 'generalLedgerId', id).subscribe((res) => {
      if (res == 1) {
        this.generalLedger = this.generalLedger.filter(({generalLedgerId}) => generalLedgerId != id)
      }
    });
  }
}
