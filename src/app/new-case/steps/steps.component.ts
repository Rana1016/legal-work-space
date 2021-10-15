import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import FormData from '../../../assets/JSONs/FormData.json'
@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }
  stepForm!: FormGroup;
  ngOnInit(): void {
    this.route.params.subscribe(({step}) => {
      let num = parseInt(step.replace(/^\D+/g, ""));
      if (num > 0 && num < 5) {
        this.setNavigation(num)
        switch (num) {
          case 1: {
            this.stepForm = this.fb.group({
              title: [0],
              first_name: ['', Validators.required],
              last_name: ['', Validators.required],
              DOB: [''],
              gender: [''],
              nationality: [0],

            })
          }
        }
      } else {
        this.router.navigate(["dashboard"])
      }
    })
  }

  Navigation: number = 1;
  setNavigation(num: number) {
    this.Navigation = num;
  }
}
