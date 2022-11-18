import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private user: UserService, private router: Router, private fb: FormBuilder) { }
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  login() {
    this.router.navigateByUrl('/dashboard')

  //   this.user.login(this.loginForm.value).subscribe(({status, body}) => {
  //     if (status == 200) {
  //       this.router.navigateByUrl('/dashboard')
  //     }
  //   });
  }
}
