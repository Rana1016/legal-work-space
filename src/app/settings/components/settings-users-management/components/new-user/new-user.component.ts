import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  newUserForm: FormGroup;
  edit?: string;
  constructor(private user: UserService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.newUserForm = this.fb.group({
      name: [''],
      email: [''],
      groupId: ['0'],
      locationId: ['0'],
      jobTitle: [''],
      jobType: ['0'],
      status: ['0'],
    });
    this.route.params.subscribe(({ userId }) => {
      if (!!userId) {
        this.edit = userId;
        this.user.getUserById(Number(this.edit)).subscribe((user) => {
          this.newUserForm.patchValue({
            ...user,
            status: user.status !== true ? '0' : '1',
          })
        });
      }
    });
  }

  ngOnInit(): void { }

  submitForm() {
    let data = { ...this.newUserForm.value, status: this.newUserForm.controls.status.value !== '0' };
    !!this.edit ?
      this.user.updateUserById(Number(this.edit), data)
        .subscribe((res) => res == '1' && this.router.navigate(['../..'], { relativeTo: this.route }))
      : this.user.addUser(data).subscribe((res) => res == '1' && this.router.navigate(['..'], { relativeTo: this.route }));
  }
}
