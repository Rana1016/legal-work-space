import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  Form,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import FormData from '../../../assets/JSONs/FormData.json';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NewCaseStepsService } from 'src/app/shared/services/new-case-steps.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  closeResult = '';
  detailHidenShow: boolean = false;
  Navigation: number = 1;
  FormData = FormData;
  stepForm!: FormGroup;
  applicantData: any;
  installmentData: any;
  categories: {
    categoryId: number;
    categoryTitle: string;
  }[] = [];
  selectedClient!: number;

  selectPlaintiff = ['single party matter', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  subCategories: {
    categoryId: number;
    subCategoryId: number;
    subCategoryTitle: string;
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private caseService: NewCaseStepsService,
    private modalService: NgbModal
  ) {}
  //  fa: FormArray;
  ngOnInit(): void {
    this.setNavigation(1);
    this.stepForm = this.fb.group({
      caseId: [0],
      plaintiff: [''],
      categoryId: [''],
      subCategoryId: [''],
      briefCaseDescription: [''],
      caseSuperVisor: [''],
      caseworker: [''],
      clientInstructions: [''],
      adviceGivenToClient: [''],
      agreedPlanOfAction: [''],
      chancesOfSuccess: [''],
      weaknessesOfCase: [''],
      conflictsOfInterest: [''],
      conflictsOfInterestDesc: [''],
      haveCriminalConviction: [''],
      criminalConvictionDesc: [''],
      addtionalInfo: [''],
      feeType: [''],
      coveredByFee: [''],
      agreedAmountOrPercentage: [''],
      isVATIncluded: [''],
      advancePayment: [''],
      courtId: [''],
      isMatter: [false],
      parentId: [0],
      hourlyRateCaseworker: [0],
      clients: this.fb.array([]),
      installments: this.fb.array([]),
      personalInfo: this.fb.array([]),
    });
    this.getCategories();
  }

  status: any;
  clickEvent(type: any) {
    if (type == 'temporary') {
      this.status = true;
      console.log(this.status);
    } else if (type == 'permanent') {
      this.status = false;
    }
  }
  Appropriate: boolean = true;
  selectAppropriate(Appropriate: any) {
    if (Appropriate == 'Plaintiff') {
      this.Appropriate = true;
    } else if (Appropriate == 'Defendant') {
      this.Appropriate = false;
    }
  }

  getPersonalInfo() {
    return (this.stepForm.get('personalInfo') as FormArray).controls;
  }

  getOtherApplicants() {
    return (this.stepForm.get('clients') as FormArray).controls;
  }

  createPersonalInfo() {
    (this.stepForm.get('personalInfo') as FormArray).push(
      this.fb.group({
        name: [''],
        fatherName: [''],
        companyName: [''],
        CNIC: [''],
        phone: [''],
        whatsApp: [''],
        email: [''],
        clientAddress: [''],
        companyAddress: [''],
        otherDetails: [''],
      })
    );
  }

  createApplicantForm() {
    return this.fb.group({
      clientId: [0],
      isContactPerson: [true],
      isOtherApplicant: [true],
      plaintiff: [''],
      defendant: [''],
      clientName: [''],
      fatherName: [''],
      companyName: [''],
      cnic: [''],
      clientAddress: [''],
      companyAddress: [''],
      phoneNumber: [''],
      clientEmail: [''],
      fax: [''],
      whatsAppNumber: [''],
      otherDetails: [''],
      isMainClient: [true],
      caseId: [0],
    });
  }

  onSelectPlaintiff() {
    let count = this.stepForm.get('plaintiff')?.value;
    (this.stepForm.get('personalInfo') as FormArray).clear();
    if (count == 'single party matter') {
      count = 1
    }
    for (let i = 0; i < count; i++) {
      this.createPersonalInfo();
    }
    console.log(this.getPersonalInfo());
  }

  addApplicantData() {
    this.applicantData = this.stepForm.get('clients') as FormArray;
    this.applicantData.push(this.createApplicantForm());
  }

  removeApplicantData(index: any) {
    const control = <FormArray>this.stepForm.controls['clients'];
    control.removeAt(index);
  }

  getInstallments() {
    return (this.stepForm.get('installments') as FormArray).controls;
  }

  createInstallments() {
    return this.fb.group({
      companyName: [''],
    });
  }

  addInstallments() {
    this.installmentData = this.stepForm.get('installments') as FormArray;
    this.installmentData.push(this.createInstallments());
  }

  removeInstallments(index: any) {
    const control = <FormArray>this.stepForm.controls['installments'];
    control.removeAt(index);
  }

  setNavigation(num: number) {
    this.Navigation = num;
  }

  contactDetailHidenShow() {
    if (this.detailHidenShow == false) {
      this.detailHidenShow = true;
    } else {
      this.detailHidenShow = false;
    }
  }

  getCategories() {
    this.caseService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getSubCategories() {
    let categoryId = this.stepForm.value.categoryId;
    this.caseService.getSubCategories(categoryId).subscribe((res) => {
      this.subCategories = res;
    });
  }

  open(content: any) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
