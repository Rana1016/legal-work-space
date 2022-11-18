import { Component, OnInit } from '@angular/core';
import { ChartsOfAccountsService } from 'src/app/shared/services/charts-of-accounts.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: 'app-new-general-ledger',
  templateUrl: './new-general-ledger.component.html',
  styleUrls: ['./new-general-ledger.component.scss']
})
export class NewGeneralLedgerComponent implements OnInit  {
  routeParam: string | null;
  constructor(private chartSubAccount: ChartsOfAccountsService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private lookup: SharedService, private user: UserService) {
    this.routeParam = route.snapshot.paramMap.get("subClassId");
    console.log(this.routeParam);

   }
  newgeneralledgerForm!: FormGroup;
  edit?: number;
  newGeneralLedger!: string;
  mainHead!: string;

  ngOnInit(): void {
    this.newgeneralledgerForm = this.fb.group({
      head: [''],
      createdBy: [this.user.getUser.userId],
      modifiedBy:[this.user.getUser.userId],
      subClassId: [this.routeParam],
      createdDate: [new Date().toISOString()],
      // mainClassId: [this.routeParam],
      modifiedDate:[new Date().toISOString()],
      generalLedgerId: [0],

    });
    this.route.params.subscribe(({mainClassId, subClassId,generalLedgerId}) => {
      console.log(generalLedgerId, subClassId);
      
      this.chartSubAccount.getSubClassById(subClassId).subscribe((chartSubAccounts: any) => {
        console.log(chartSubAccounts);
        
        this.newGeneralLedger = chartSubAccounts.head;
        this.newgeneralledgerForm.patchValue({ subClassId: Number(subClassId) });
        this.mainHead = subClassId.mainClassHead;
      });
      generalLedgerId && (this.edit = Number(generalLedgerId));
      generalLedgerId && this.lookup.getOptions('tblGeneralLedger', 'generalLedgerId', 'head', 'generalLedgerId', `${generalLedgerId}`).subscribe(([subClass]) => {
        console.log(subClass);
        
        this.newgeneralledgerForm.patchValue({
          generalLedgerId: subClass?.keyValue,
          head: subClass?.displayValue
        })
      });
    })
  }

  submitForm() {
    (!this.edit ?
      this.chartSubAccount.addNewGeneralLedger(this.newgeneralledgerForm.value)
      : this.chartSubAccount.updateGeneralLedgers(this.edit,{head:this.newgeneralledgerForm.value.head,modifiedBy:this.user.getUser.userId,modifiedDate:new Date().toISOString(), subClassId:this.newgeneralledgerForm.value.subClassId  })
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}

