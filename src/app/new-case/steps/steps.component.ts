import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import FormData from '../../../assets/JSONs/FormData.json';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NewCaseStepsService } from 'src/app/shared/services/new-case-steps.service';

enum ClientTypes {
  PLAINTIFF = 'plaintiff',
  DEFENDANT = 'defendant',
  THIRDPARTY = 'thirdParty'
}
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
  CTypes = ClientTypes;
  categories: {
    categoryId: [0];
    categoryTitle: [''];
  }[] = [];
  selectedClient: number = 0;
  selectedType: string = ClientTypes.PLAINTIFF;
  leadClient!: any;
  leadType!: any;
  showModal: boolean = false;
  isTemporary?: boolean;
  selectPlaintiff = ['single party matter', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  showPersonalDetails!: boolean;
  subCategories: {
    categoryId: number[];
    subCategoryId: number[];
    subCategoryTitle: string[];
  }[] = [];
  subCategoriesOffense: {
    categoryId: number[];
    subCategoryId: number[];
    subCategoryTitle: string[];
  }[] = [];
  subCategoriesDescription: {
    categoryId: number[];
    subCategoryId: number[];
    subCategoryTitle: string[];
  }[] = [];
  navItems: string[] = [
    'Personal Information',
    'Case Details',
    'Team Details',
    'Court Details',
    'Payment Options',
    'Declarations & Submit'
  ]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private caseService: NewCaseStepsService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    if (this.router.url.includes('temp')) { this.isTemporary = true; }
    this.setNavigation(1);
    this.stepForm = this.fb.group({
      caseId: [0],
      isTemporaryCase: [this.isTemporary],
      modeOfCorrespondence: [''],
      howDidYouHear: [''],
      categoryId: [0],
      subCategoryId: [0],
      lescoCase: [false],
      briefCaseDescription: [''],
      caseSource: [''],
      caseOwner: [''],
      caseSuperVisor: [''],
      caseWorker: [''],
      caseClerk: [''],
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
      nameOfCourt: [0],
      typeOfBench: [1],
      judges: this.fb.array([this.fb.control('')]),
      districtOrBenchOrTehsil: [''],
      anyOtherDetails: [''],
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
      plaintiffType: ['plaintiff'],
      plaintiff: [0],
      defendant: [0],
      thirdParty: [0],
      plaintiffs: this.fb.array([]),
      defendants: this.fb.array([]),
      thirdParties: this.fb.array([]),
      isContactPerson: [false],
      cpName: [''],
      cpFatherName: [''],
      cpCompanyName: [''],
      cpCNIC: [''],
      cpPhone: [''],
      cpWhatsApp: [''],
      cpEmail: [''],
      cpAddress: [''],
      cpOtherDetails: [''],
      categories: [[]],
      subcategories: [[]],
    });
    this.getCategories();

    this.stepForm.controls.lescoCase.valueChanges.subscribe((bool) => {
      if (bool) {
        this.stepForm.addControl('lescoType', this.fb.control([null]));
        this.stepForm.controls.lescoType.valueChanges.subscribe((val) => {
          this.stepForm.removeControl('lescoGroup');
          if (val == 'CLO') {
            this.stepForm.addControl('lescoGroup', this.fb.group({
              cloDivision: [''],
              cloSubDivision: [''],
              cloConsumerRef: [''],
              cloClerkName: ['']
            }))
          } else if (val == 'SE') {
            this.stepForm.addControl('lescoGroup', this.fb.group({
              seCircle: [0],
              seDivision: [''],
              seSubDivision: [''],
              seConsumer: [''],
              seClerkName: ['']
            }))
          }
        })
      } else {
        this.stepForm.removeControl('lescoType');
      }
    });
  }

  onSelectClient(type: string) {
    switch (type) {
      case ClientTypes.PLAINTIFF: {
        let count = this.stepForm.get(ClientTypes.PLAINTIFF)?.value;
        (this.stepForm.get(ClientTypes.PLAINTIFF + 's') as FormArray).clear();
        if (count == 'single party matter') {
          count = 1;
        }
        for (let i = 0; i < count; i++) {
          (this.stepForm.get(ClientTypes.PLAINTIFF + 's') as FormArray).push(
            this.createClient()
          );
        }
        break
      }
      case ClientTypes.DEFENDANT: {
        let count = this.stepForm.get(ClientTypes.DEFENDANT)?.value;
        (this.stepForm.get(ClientTypes.DEFENDANT + 's') as FormArray).clear();
        if (count == 'single party matter') {
          count = 1;
        }
        for (let i = 0; i < count; i++) {
          (this.stepForm.get(ClientTypes.DEFENDANT + 's') as FormArray).push(
            this.createClient()
          );
        }
        break
      }
      case ClientTypes.THIRDPARTY: {
        let count = this.stepForm.get(ClientTypes.THIRDPARTY)?.value;
        (this.stepForm.get('thirdParties') as FormArray).clear();
        if (count == 'single party matter') {
          count = 1;
        }
        for (let i = 0; i < count; i++) {
          (this.stepForm.get('thirdParties') as FormArray).push(
            this.createClient()
          );
        }
        break
      }
      default: {
        break
      }
    }
  }

  getClients(type: string) {
    switch (type) {
      case ClientTypes.PLAINTIFF: {
        return (this.stepForm.get(ClientTypes.PLAINTIFF + 's') as FormArray).controls;
      }
      case ClientTypes.DEFENDANT: {
        return (this.stepForm.get(ClientTypes.DEFENDANT + 's') as FormArray).controls;
      }
      case ClientTypes.THIRDPARTY: {
        return (this.stepForm.get('thirdParties') as FormArray).controls;
      }
      default: {
        return
      }
    }
  }

  createClient() {
    return this.fb.group({
      status: [],
      title: [0],
      name: [''],
      nickName: [''],
      gender: [0],
      fatherName: [''],
      companyName: [''],
      CNIC: [''],
      phone: [''],
      whatsApp: [''],
      email: [''],
      address: [''],
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
      cpAddress: [''],
      cpOtherDetails: [''],
      applicants: this.fb.array([]),
    });
  }

  setLead(i: number, type: string, modal: any, e: MouseEvent) {
    if (this.leadClient == null) {
      this.leadClient = i;
      this.leadType = type;
    } else if (this.leadClient == i && this.leadType == type) {
      (<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i]
      .patchValue({
        status: null
      });
      this.leadClient = null;
      this.leadType = null;
    } else {
      (<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i]
      .patchValue({
        status: null
      });
      e.stopPropagation();
      this.open(modal)
    }
  }

  setStatus(i: number, type: string, e: MouseEvent) {
    if ((<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i].value.status == 'lead') {
      this.leadClient = null;
      this.leadType = null;
    };
    e.stopPropagation();
  }

  createApplicantForm() {
    return this.fb.group({
      clientId: [0],
      status: [null],
      isOtherApplicant: [true],
      clientName: [''],
      fatherName: [''],
      companyName: [''],
      cnic: [''],
      address: [''],
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

  setLeadApplicant(c: number, type: string, isLead: HTMLInputElement, e: MouseEvent, modal: any) {
    // if (this.leadClient == null) {
    //   this.leadClient = c;
    //   this.leadType = type;
    // } else if ((this.leadClient == c && this.leadType == type)) {
    //   isLead.checked = false;
    //   this.leadClient = null;
    // } else {
    //   isLead.checked = false;
    //   e.stopPropagation();
    //   this.open(modal)
    // }
  }

  setClientApplicant(isClient: boolean, i: number, type: string, checkClient: HTMLInputElement, checkNonClient: HTMLInputElement, e: MouseEvent) {
    switch (isClient) {
      case true: {
        if (checkNonClient.checked) {
          // (this.stepForm.controls[type+'s'] as FormArray).controls[i]
          // .patchValue({
          //   isNonClient: false
          // });
          checkNonClient.checked = false;
        }
        break
      }
      case false:
        if (checkClient.checked) {
          // (this.stepForm.controls[type+'s'] as FormArray).controls[i]
          // .patchValue({
          //   isClient: false
          // });
          checkClient.checked = false;
        }
        break
    }
    e.stopPropagation();
  }

  getOtherApplicants(type: string, i: number) {
    return (((this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties'] as FormArray).controls[i] as FormGroup).controls['applicants'] as FormArray).controls;
  }

  addApplicantData(type: string, i: number) {
    this.applicantData = ((this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties'] as FormArray).controls[i] as FormGroup).controls['applicants'] as FormArray;
    this.applicantData.push(this.createApplicantForm());
  }

  removeApplicantData(type: string, i: number, a: number) {
    const control = ((this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties'] as FormArray).controls[i] as FormGroup).controls['applicants'] as FormArray;
    control.removeAt(a);
  }

  addJudges() {
    (this.stepForm.controls['judges'] as FormArray).clear();
    for (var i = 0; i < (this.stepForm.value.typeOfBench); i++) {
      (this.stepForm.controls['judges'] as FormArray).controls.push(this.fb.control(''))
    }
  }
  addJudge() {
    (this.stepForm.controls['judges'] as FormArray).controls.push(this.fb.control(''))
  }

  removeJudge(i: number) {
    const Judges = (this.stepForm.get('judges') as FormArray);
    Judges.removeAt(i);
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
    this.caseService.getSubCategories(this.stepForm.value.categories).subscribe((res) => {
      Object.keys(res).forEach((key, i) => {
        if (this.stepForm.value.categories.includes(12)) {
          this.subCategoriesDescription = [...this.subCategoriesDescription, ...res[key].filter((r: any) => r.categoryId == 12)];
          this.subCategoriesOffense = [...this.subCategoriesOffense, ...res[key].filter((r: any) => r.categoryId == 13)];
          res[key] = res[key].filter((r: any) => r.categoryId !== 12)
          res[key] = res[key].filter((r: any) => r.categoryId !== 13)
        }
        if (i !== Object.keys(res).length - 1) {
          res[key] = res[key].filter((r: any) => r.subCategoryId !== 0)
        }
        this.subCategories = [...this.subCategories, ...res[key]]

      })
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
