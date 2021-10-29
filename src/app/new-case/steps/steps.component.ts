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
    categoryId: [0];
    categoryTitle: [''];
  }[] = [];
  selectedClient: number = 0;

  selectPlaintiff = ['single party matter', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  subCategories: {
    categoryId: [0];
    subCategoryId: [0];
    subCategoryTitle: [''];
  }[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private caseService: NewCaseStepsService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.setNavigation(1);
    this.stepForm = this.fb.group({
      caseId: [0],
      isTemporaryCase: [true],
      modeOfCorrespondence: [''],
      howDidYouHear: [''],
      categoryId: [0],
      subCategoryId: [0],
      briefCaseDescription: [''],
      caseSuperVisor: [0],
      caseworker: [0],
      clientInstructions: [''],
      adviceGivenToClient: [''],
      agreedPlanOfAction: [''],
      chancesOfSuccess: [''],
      weaknessesOfCase: [''],
      conflictsOfInterest: [0],
      conflictsOfInterestDesc: [''],
      haveCriminalConviction: [0],
      criminalConvictionDesc: [''],
      addtionalInfo: [''],
      feeType: [''],
      coveredByFee: [''],
      agreedAmountOrPercentage: [0],
      isVATIncluded: [false],
      advancePayment: [0],
      courtId: [0],
      isMatter: [false],
      parentId: [0],
      hourlyRateCaseworker: [0],
      isDeleted: true,
      clients: this.fb.array([]),
      installments: this.fb.array([]),
      // Requirements
      plaintiff: [0],
      personalInfo: this.fb.array([]),
      categoryIDs: [[]],
      subCategoryIDs: [[]],
    });
    this.getCategories();
  }

  status: any;
  clickEvent(type: any) {
    if (type == 'temporary') {
      this.status = true;
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
    return this.fb.group({
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
      isContactPerson: [false],
      cpName: [''],
      cpFatherName: [''],
      cpCompanyName: [''],
      cpCNIC: [''],
      cpPhone: [''],
      cpWhatsApp: [''],
      cpEmail: [''],
      cpClientAddress: [''],
      cpOtherDetails: [''],
    });
  }

  createApplicantForm() {
    return this.fb.group({
      clientId: [0],
      lead: [false],
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
      lawyerName: [''],
      lawyerFirmName: [''],
      lawyerAddress: [''],
      lawyerPhoneNumber: [''],
      lawyerEmail: [''],
      lawyerFax: [''],
      lawyerWhatsAppNumber: [''],
      lawyerOtherDetails: [''],
    });
  }

  onSelectPlaintiff() {
    let count = this.stepForm.get('plaintiff')?.value;
    (this.stepForm.get('personalInfo') as FormArray).clear();
    if (count == 'single party matter') {
      count = 1;
    }
    for (let i = 0; i < count; i++) {
      (this.stepForm.get('personalInfo') as FormArray).push(
        this.createPersonalInfo()
      );
    }
  }

  clog() {}

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

  createInstallment() {
    return this.fb.group({
      installmentId: [0],
      dueDate: [Date.now()],
      amount: [0],
      caseId: [0],
      isDeleted: [false],
    });
  }

  addInstallments() {
    this.installmentData = this.stepForm.get('installments') as FormArray;
    this.installmentData.push(this.createInstallment());
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
    this.subCategories = [];
    console.log(this.stepForm.value.categoryIDs)
    this.caseService.getSubCategories(this.stepForm.value.categoryIDs).subscribe((res) => {
      this.subCategories = [...this.subCategories, ...res];
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

  submitForm() {
    this.caseService.submitData(this.stepForm.value).subscribe()
  }
}
