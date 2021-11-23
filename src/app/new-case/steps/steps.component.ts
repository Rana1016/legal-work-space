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
import { TitleCasePipe } from '@angular/common';

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
    private modalService: NgbModal,
    private capitalize: TitleCasePipe
  ) { }
  ngOnInit(): void {
    if (this.router.url.includes('temp')) { this.isTemporary = true; }
    this.setNavigation(1);
    this.stepForm = this.fb.group({
      caseId: [0],
      isTemporaryCase: [this.isTemporary],
      modeOfCorrespondence: [''],
      howDidYouHear: [''],
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
      cpPhoneNumber: [''],
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
            this.createClient(type)
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
            this.createClient(type)
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
            this.createClient(type)
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

  createClient(type?: string, client?: any) {
    return this.fb.group({
      type: [type],
      status: [client ? client?.status : null],
      title: [0],
      name: [client ? client?.name :''],
      nickName: [''],
      gender: [0],
      fatherName: [client ? client?.fatherName :''],
      companyName: [client ? client?.companyName :''],
      CNIC: [client ? client?.CNIC :''],
      phoneNumber: [client ? client?.phoneNumber :''],
      whatsApp: [client ? client?.whatsApp :''],
      email: [client ? client?.email :''],
      address: [client ? client?.address : ''],
      companyAddress: [client ? client?.companyAddress : ''],
      otherDetails: [client ? client?.otherDetails : ''],
      isContactPerson: [false],
      cpName: [''],
      cpFatherName: [''],
      cpCompanyName: [''],
      cpCNIC: [''],
      cpPhoneNumber: [''],
      cpWhatsApp: [''],
      cpEmail: [''],
      cpAddress: [''],
      cpOtherDetails: [''],
      applicants: this.fb.array([]),
    });
  }

  setLead(i: number, type: string, modal: any, e?: MouseEvent) {
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
          status: 
          (<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i].value.status == null ?
          null :
          (<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i].value.status
        });
      e?.stopPropagation();
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

  createApplicantForm(clientId: number, applicantId: number) {
    return this.fb.group({
      clientId: [clientId],
      applicantId: [applicantId],
      status: [null],
      isOtherApplicant: [true],
      name: [''],
      fatherName: [''],
      companyName: [''],
      CNIC: [''],
      address: [''],
      companyAddress: [''],
      phoneNumber: [''],
      email: [''],
      fax: [''],
      whatsApp: [''],
      otherDetails: [''],
      isMainClient: [true],
      caseId: [0],
      lawyerName: [''],
      lawyerFirmName: [''],
      lawyerAddress: [''],
      lawyerPhoneNumber: [''],
      lawyerEmail: [''],
      lawyerFax: [''],
      lawyerWhatsApp: [''],
      lawyerOtherDetails: [''],
    });
  }

  getOtherApplicants(type: string, i: number) {
    return (((this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties'] as FormArray).controls[i] as FormGroup).controls['applicants'] as FormArray).controls;
  }

  addApplicantData(type: string, i: number, content: any) {
    let applicantData = ((this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties'] as FormArray).controls[i] as FormGroup).controls['applicants'] as FormArray;
    applicantData.push(this.createApplicantForm(i, applicantData.length));
    applicantData.controls[applicantData.length - 1].valueChanges.subscribe((applicant) => {
      if (applicant.status != null) {
        let clientsData = (this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties'] as FormArray);
        let newApplicantData = ((clientsData.controls[i] as FormGroup).controls['applicants'] as FormArray);
        if (applicant.status == 'lead') {
          if (!this.leadClient && !this.leadType) {
            clientsData.push(
              type == ClientTypes.PLAINTIFF ? this.createClient(this.stepForm.value.plaintiffType, applicant) :   this.createClient(type, applicant)
            );
            newApplicantData.removeAt(i);
          } else {
            newApplicantData.controls[newApplicantData.length - 1].patchValue({
              status: null
            })
          }
          this.setLead(clientsData.length - 1, type, content);
        } else {
          clientsData.push(
            type == ClientTypes.PLAINTIFF ? this.createClient(this.stepForm.value.plaintiffType, applicant) :   this.createClient(type, applicant)
          );
          newApplicantData.removeAt(i);
          }
        // console.log(`${this.capitalize.transform(type)} ${(clientId+1)} ${(applicantId+10).toString(36).toUpperCase()}`)
      }
    })
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

  get caseTitle() {
    let title = this.capitalize.transform(this.stepForm.value.plaintiffType);
    if (this.stepForm.value.plaintiff == 'single party matter' && this.stepForm.value.defendant == 'single party matter') {
      return `${title} vs Defendant`
    } else if (this.stepForm.value.plaintiff  !== 0 && this.stepForm.value.defendant !== 0) {
      if (this.stepForm.value.plaintiffs[0].nickName) {
        return `${title} (1) - (${this.stepForm.value.plaintiffs[0].nickName.length <= 5 ? this.stepForm.value.plaintiffs[0].nickName : this.stepForm.value.plaintiffs[0].nickName.slice(0, 5) + '...' }) etc vs Defendant (1) etc`
      } else if (this.stepForm.value.defendants[0].nickName) {
        return `${title} (1) etc vs Defendant (1) (${this.stepForm.value.defendants[0].nickName.length <= 5 ? this.stepForm.value.defendants[0].nickName : this.stepForm.value.defendants[0].nickName.slice(0, 5) + '...' }) etc`
      } else if (this.stepForm.value.plaintiffs[0].nickName && this.stepForm.value.defendants[0].nickName) {
        return `${title} (1) - (${this.stepForm.value.plaintiffs[0].nickName.length <= 5 ? this.stepForm.value.plaintiffs[0].nickName : this.stepForm.value.plaintiffs[0].nickName.slice(0, 5) + '...' }) etc vs Defendant (1) - (${this.stepForm.value.defendants[0].nickName.length <= 5 ? this.stepForm.value.defendants[0].nickName : this.stepForm.value.defendants[0].nickName.slice(0, 5) + '...' }) etc`
      } else {
        return `${title} (1) etc vs Defendant (1) etc`  
      }
    }
    return
  }

  setNavigation(num: number) {
    this.Navigation = num;
  }

  getCategories() {
    this.caseService.getCategories().subscribe((res) => {
      this.categories = res.filter(({categoryId}: any) => categoryId !== 11);
    });
  }

  getSubCategories() {
    this.subCategories = [];
    if (this.stepForm.value.categories.length == 0) {
      this.stepForm.controls.subcategories?.reset()
    } else {
      this.caseService.getSubCategories(this.stepForm.value.categories).subscribe((res) => {
        Object.keys(res).forEach((key, i) => {
          if (this.stepForm.value.categories.includes(12)) {
            this.subCategoriesDescription = [...this.subCategoriesDescription, ...res[key].filter((r: any) => r.categoryId == 12)];
            this.subCategoriesOffense = [...this.subCategoriesOffense, ...res[key].filter((r: any) => r.categoryId == 13)];
            res[key] = res[key].filter(({categoryId}: any) => categoryId !== 12)
            res[key] = res[key].filter(({categoryId}: any) => categoryId !== 13)
          }
          if (i !== Object.keys(res).length - 1) {
            res[key] = res[key].filter((r: any) => r.subCategoryId !== 0)
          }
          this.subCategories = [...this.subCategories, ...res[key]]
        });
        let subIDs = this.subCategories.map(({subCategoryId}) => subCategoryId);
        this.stepForm.controls.subcategories
        .setValue(this.stepForm.value.subcategories.filter((subCategoryId: any) => subIDs.includes(subCategoryId)))
      })
    }
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
