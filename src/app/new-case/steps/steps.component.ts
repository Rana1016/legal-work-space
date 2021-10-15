import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import FormData from '../../../assets/JSONs/FormData.json';
@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}
  FormData = FormData;
  stepForm!: FormGroup;
  ngOnInit(): void {
    this.route.params.subscribe(({ step }) => {
      let num = parseInt(step.replace(/^\D+/g, ''));
      if (num > 0 && num < 5) {
        this.setNavigation(num);
        switch (num) {
          case 1: {
            this.stepForm = this.fb.group({
              title: [0],
              firstName: ['', Validators.required],
              lastName: ['', Validators.required],
              dateOfBirth: [Date.now()],
              gender: [0],
              nationality: [0],
              companyName: [''],
              address: [''],
              city: [''],
              country: [0],
              zipCode: [''],
              email: [''],
              phonePrimary: [''],
              phoneSecondary: [''],
              preferredMode: [0],
              hearAboutUs: [0],
            });
            break;
          }
          case 2: {
            this.stepForm = this.fb.group({
              category: [0],
              subCategory: [0],
              briefCaseDesc: [''],
              caseSupervisor: [0],
              caseWorker: [0],
              clientsInstruction: [''],
              AdviceToClient: [''],
              agreedPlanAction: [''],
              chancesOfSuccess: [0],
              weaknessOfCase: [''],
              conflictOfInterest: [0],
              conflictOfInterestExplain: [''],
              criminalConvictions: [0],
              explanation: [''],
              additionalInformation: [''],
            });
            break;
          }
          case 3: {
            this.stepForm = this.fb.group({
              feeType: [0],
              coveredByAgreement: [''],
              agreedFee: [''],
              IsVatApplicable: [false],
              advancedPayment: [0.00],
              installmentDueDate: Date,
              installmentAmount: [0.00],
            });
            break;
          }
        }
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  Navigation: number = 1;
  setNavigation(num: number) {
    this.Navigation = num;
  }
}
