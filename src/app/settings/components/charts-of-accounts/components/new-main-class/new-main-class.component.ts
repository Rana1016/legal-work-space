import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartsOfAccountsService } from 'src/app/shared/services/charts-of-accounts.service';
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: 'app-new-main-class',
  templateUrl: './new-main-class.component.html',
  styleUrls: ['./new-main-class.component.scss']
})
export class NewMainClassComponent implements OnInit{
  constructor(private chartAccounts: ChartsOfAccountsService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private user: UserService) { }
  newMainClassForm!: FormGroup;
  edit?: number;
  ngOnInit(): void {
    this.newMainClassForm = this.fb.group({
      head: [''],
      createdBy: [this.user.getUser.userId],
      createdDate: [new Date().toISOString()],
      // modifiedBy: [this.user.getUser.userId],
      // modifiedDate: [new Date().toISOString()],
      // mainClassId:['']
    });
    this.route.params.subscribe(({mainClassId}) => {
      this.edit = Number(mainClassId);
      this.chartAccounts.getCaseCategoryById(this.edit).subscribe((chartAccounts) => {
        this.newMainClassForm.patchValue(chartAccounts);
      });
    })
  }

  submitForm() {
    (!this.edit ?
      this.chartAccounts.addNewMainClass(this.newMainClassForm.value)
      : this.chartAccounts.updateMainClass(this.edit, {head: this.newMainClassForm.value.head,modifiedBy:this.user.getUser.userid,modifiedDate:new Date().toISOString(), mainClassId:this.newMainClassForm })
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}
