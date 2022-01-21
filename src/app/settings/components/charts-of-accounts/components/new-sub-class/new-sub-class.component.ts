import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartsOfAccountsService } from 'src/app/shared/services/charts-of-accounts.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: 'app-new-sub-class',
  templateUrl: './new-sub-class.component.html',
  styleUrls: ['./new-sub-class.component.scss']
})
export class NewSubClassComponent implements OnInit   {
  routeParam: string | null;
  constructor(private chartSubAccount: ChartsOfAccountsService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private lookup: SharedService, private user: UserService) {
    this.routeParam = route.snapshot.paramMap.get("mainClassId");
    console.log(this.routeParam);

   }
  newSubClassForm!: FormGroup;
  edit?: number;
  newSubClass!: string;
  ngOnInit(): void {
    this.newSubClassForm = this.fb.group({
      head: [''],
      createdBy: [this.user.getUser.userId],
      modifiedBy:[this.user.getUser.userId],
      subClassId: [0],
      createdDate: [new Date().toISOString()],
      mainClassId: [this.routeParam],
      modifiedDate:[new Date().toISOString()]

    });
    this.route.params.subscribe(({mainClassId, subClassId}) => {
      this.chartSubAccount.getCaseCategoryById(mainClassId).subscribe((chartSubAccounts: any) => {
        this.newSubClass = chartSubAccounts.head;
        this.newSubClassForm.patchValue({mainClassId: Number(mainClassId)});
      });
      subClassId && (this.edit = Number(subClassId));
      subClassId && this.lookup.getOptions('tblSubClass', 'SubClassId', 'head', 'SubClassId', `${subClassId}`).subscribe(([subClass]) => {
        this.newSubClassForm.patchValue({
          subClassId: subClass.keyValue,
          head: subClass.displayValue
        })
      });
    })
  }

  submitForm() {
    (!this.edit ?
      this.chartSubAccount.addNewSubClass(this.newSubClassForm.value)
      : this.chartSubAccount.updateSubClass(this.edit,{head:this.newSubClassForm.value.head,modifiedBy:this.user.getUser.userid,modifiedDate:new Date().toISOString(), subClassId:this.newSubClassForm  })
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}
