import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import FormData from '../../../assets/JSONs/FormData.json';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit
{
  closeResult = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal
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
              caseInstruction:[0],
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
              IsVatApplicable: [0],
              advancedPayment: ['0.00'],
              installmentDueDate: [Date.now()],
              installmentAmount: ['0.00'],
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
  open(content:any)
  {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) =>
    {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) =>
    {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string
  {
    if (reason === ModalDismissReasons.ESC)
    {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK)
    {
      return 'by clicking on a backdrop';
    } else
    {
      return `with: ${reason}`;
    }
  }
}
