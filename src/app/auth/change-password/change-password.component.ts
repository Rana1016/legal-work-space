import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  constructor(private user: UserService, private router: Router, private fb: FormBuilder) { }
  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  changePassword() {
    this.user.changePassword(this.changePasswordForm.value)
  }
}
