import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app--client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class ClientLoginComponent implements OnInit {

  constructor(private user: UserService, private router: Router, private fb: FormBuilder) { }
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [''],
      password: ['']
    });
  }
  login() {
    console.log(this.loginForm.value);
    
    this.user.clientLogin(this.loginForm.value).subscribe(({status, body}) => {
      if (status == 200) {
        console.log(body)
        this.router.navigateByUrl('/client/my-cases')
      }
    });
  }

}
