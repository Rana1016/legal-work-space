import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  newGroupForm: FormGroup;
  edit?: string;
  ngOnInit(): void { }
  constructor(private group: GroupService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.newGroupForm = this.fb.group({
      groupTitle: [''],
      canManageActivities: ['0'],
      canManageCaseCategories: ['0'],
      canManageUsers: ['0'],
      canManagePeshi: ['0'],
      canManageCase: ['0'],
    });

    this.route.params.subscribe(({ groupId }) => {
      if (!!groupId) {
        this.edit = groupId;
        this.group.getGroupById(Number(this.edit)).subscribe((group) => {
          this.newGroupForm.patchValue({
            ...group,
            canManageCase: group.canManageCase !== true ? '0' : '1',
            canManageCaseCategories: group.canManageCaseCategories !== true ? '0' : '1',
            canManagePeshi: group.canManagePeshi !== true ? '0' : '1',
            canManageUsers: group.canManageUsers !== true ? '0' : '1',
            canManageActivities: group.canManageActivities !== true ? '0' : '1',
          })
        });
      }
    });
  }

  submitForm() {
    let data = {
      ...this.newGroupForm.value,
      canManageCase: this.newGroupForm.controls.canManageCase.value !== '0',
      canManageCaseCategories: this.newGroupForm.controls.canManageCaseCategories.value !== '0',
      canManagePeshi: this.newGroupForm.controls.canManagePeshi.value !== '0',
      canManageUsers: this.newGroupForm.controls.canManageUsers.value !== '0',
      canManageActivities: this.newGroupForm.controls.canManageActivities.value !== '0',
    };
    !!this.edit ?
      this.group.updateGroupById(Number(this.edit), data)
        .subscribe((res) => res == '1' && this.router.navigate(['../..'], { relativeTo: this.route }))

      : this.group.addGroup(data)
        .subscribe((res) => res == '1' && this.router.navigate(['..'], { relativeTo: this.route }));
  }
}
