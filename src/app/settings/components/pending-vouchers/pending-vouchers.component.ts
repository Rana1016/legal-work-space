import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { GeneralTransactionService } from 'src/app/shared/services/general-transaction.service';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-pending-vouchers',
  templateUrl: './pending-vouchers.component.html',
  styleUrls: ['./pending-vouchers.component.scss']
})
export class PendingVouchersComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  public dtOptions : DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  groupId: number = Number(JSON.parse(localStorage.getItem('user')!).groupId);
  userId: number = Number(JSON.parse(localStorage.getItem('user')!).userId)
  pendingVouchers: any;
  constructor(private journalDetail: GeneralTransactionService) { }

  ngOnInit(): void {
    this.loadDtOption();
  }
  loadDtOption(){
    console.log('loading');
    
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
        processing: 'Loading Pending Vouchers...',
        emptyTable: 'No Pending Vouchers available.'
      },
      columns: [{
        title: 'Title',
        data: 'description',
        orderable:true
      },{
        title: 'Created By',
        data: 'createdBy',
        orderable:true
      },

        {
          title: 'Date',
          data: 'createdDate',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      destroy: true,
      ajax: this.ajaxjournalVoucher.bind(this)
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ajaxjournalVoucher(dtParams: any, callback?: any) {
    console.log('in func');
    
    this.journalDetail.getAllPendingVouchers(this.groupId, dtParams).subscribe((data : any) => {
      
      this.pendingVouchers = data.records;
      callback({
        recordsTotal: data.totalRecords,
        recordsFiltered: data.totalRecords,
        data: []
      })
    });
  }

  approveVoucher(masterId : number){
    this.journalDetail.approveVoucher(masterId, this.groupId, this.userId).subscribe((res) => {
      if(res == 1){
        this.reRenderData();
      }
    })
  }

  reRenderData(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  
  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
}
