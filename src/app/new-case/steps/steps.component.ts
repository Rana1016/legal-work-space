import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import FormData from '../../../assets/JSONs/FormData.json';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TitleCasePipe } from '@angular/common';
import { FormField } from 'src/app/shared/interfaces/case.interface';
import { mandatoryCaseDetailsFields, mandatoryCourtDetailsFields, mandatoryFieldsApplicant, mandatoryFieldsClient, mandatoryPaymentOptionsFields, mandatoryTeamDetailsFields } from './stepForm.static';
import { CasesService } from 'src/app/shared/services/cases.service';

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
  CTypes = ClientTypes;
  categories: {
    categoryId: [0];
    categoryTitle: [''];
  }[] = [];
  selectedClient: number = 0;
  selectedType: string = ClientTypes.PLAINTIFF;
  leadClient!: any;
  leadType!: any;
  leadApplicant?: any;
  showModal: boolean = false;
  isTemporary?: boolean;
  isMatter?: boolean;
  caseId!: number;
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
  navItems: {
    title: string;
    total: number;
    current: number;
  }[] = [
      {
        title: 'Personal Information',
        total: 100,
        current: 0
      }, {
        title: 'Case Details',
        total: 100,
        current: 0
      }, {
        title: 'Team Details',
        total: 100,
        current: 0
      }, {
        title: 'Court Details',
        total: 100,
        current: 0
      }, {
        title: 'Payment Options',
        total: 100,
        current: 100
      }, {
        title: 'Declarations & Submit',
        current: 100,
        total: 100
      }
    ];
  hoverIndex?: number;
  teamDetails!: any[];
  lawyerDetails?: any = null;

  totalPlaintiffs: number = 0;
  currentPlaintiffs: number = 0;
  totalDefendants: number = 0;
  currentDefendants: number = 0;
  totalThirdParties: number = 0;
  currentThirdParties: number = 0;

  @ViewChild('nextModal') NextModal!: TemplateRef<any>;
  @ViewChild('errorModal') ErrorModal!: TemplateRef<any>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private caseService: CasesService,
    private modalService: NgbModal,
    private capitalize: TitleCasePipe
  ) { }
  ngOnInit(): void {
    if (this.router.url.includes('temp')) { this.isTemporary = true; }
    if (this.router.url.includes('new-matter')) {
      this.isMatter = true;
      const UrlPartitions = this.router.url.split('/');
      this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
    }
    this.stepForm = this.fb.group({
      parentCaseId: [this.caseId || 0],
      isTemporary: [this.isTemporary || false],
      isMatter: [this.isMatter || false],
      caseDetails: this.fb.group({
        clientInstructions: [''],
        categories: [[]],
        subcategories: [[]],
        subCategoriesDescription: [[]],
        subCategoriesOffense: [[]],
        lescoCase: [false],
        briefCaseDescription: [''],
        caseInstructions: ["0"],
        litigationCaseTitle: [''],
        dateOfLastHearing: [''],
        dateOfNextHearing: [''],
        filingDate: [new Date().toISOString().split("T")[0]],
        courtCaseNumber: [''],
        adviceGivenToClient: [''],
        agreedPlanOfAction: [''],
        chancesOfSuccess: ["0"],
        weaknessesOfCase: [''],
        conflictsOfInterest: ["0"],
        conflictsOfInterestDesc: [''],
        haveCriminalConviction: ["0"],
        criminalConvictionDesc: [''],
        addtionalInfo: [''],
        // modeOfCorrespondence: [''],
        // howDidYouHear: [''],
      }),
      teamDetails: this.fb.group({
        caseSource: ["0"],
        caseOwner: ["0"],
        caseSuperVisor: ["0"],
        caseWorker: ["0"],
        caseClerk: ["0"]
      }),
      courtDetails: this.fb.group({
        nameOfCourt: ["0"],
        typeOfBench: ["1"],
        judges: this.fb.array([this.fb.control('')]),
        districtOrBenchOrTehsil: [''],
        anyOtherDetails: [''],
      }),
      paymentOptions: this.fb.group({
        feeType: ["1"],
        feeTypeForm: this.fb.group({
          coveredByFeeAgreement: [''],
          agreedFee: [''],
          isVATIncluded: ["0"],
          advancePayment: [''],
          installments: this.fb.array([this.createInstallment()]),
        })
      }),
      courtId: [0],
      parentId: [0],
      hourlyRateCaseworker: [0],
      isDeleted: true,
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
    });
    this.getCategories();
    this.incrementEditedFields('plaintiff');
    this.incrementEditedFields('defendant');
    this.incrementEditedFields('thirdParty');
    this.incrementEditedFields(null, 'Case Details', 'caseDetails', mandatoryCaseDetailsFields);
    (<FormGroup>this.stepForm.controls.caseDetails).controls.lescoCase.valueChanges.subscribe((bool) => {
      const caseDetails = <FormGroup>this.stepForm.controls.caseDetails;
      if (bool) {
        caseDetails.addControl('lescoType', this.fb.control(null));
        caseDetails.controls.lescoType.valueChanges.subscribe((val) => {
          caseDetails.removeControl('lescoGroup');
          if (val == 'CLO') {
            caseDetails.addControl('lescoGroup', this.fb.group({
              cloDivision: [''],
              cloSubDivision: [''],
              cloConsumerRef: [''],
              cloClerkName: ['']
            }))
          } else if (val == 'SE') {
            caseDetails.addControl('lescoGroup', this.fb.group({
              seCircle: [0],
              seDivision: [''],
              seSubDivision: [''],
              seConsumer: [''],
              seClerkName: ['']
            }))
          }
        })
      } else {
        caseDetails.removeControl('lescoType');
        caseDetails.removeControl('lescoGroup');
      }
    });
    this.incrementEditedFields(null, 'Team Details', 'teamDetails', mandatoryTeamDetailsFields);
    this.incrementEditedFields(null, 'Court Details', 'courtDetails', mandatoryCourtDetailsFields);
    (<FormGroup>this.stepForm.controls.paymentOptions).controls.feeType.valueChanges
      .subscribe((feeType) => {
        const feeForm = (<FormGroup>(<FormGroup>this.stepForm.controls.paymentOptions).controls.feeTypeForm)
        feeType == 1 || feeType == 2 ? (
          feeForm.setControl('agreedFee', this.fb.control('')),
          feeForm.setControl('isVATIncluded', this.fb.control("0")),
          feeForm.setControl('advancePayment', this.fb.control('')),
          feeForm.setControl('installments', this.fb.array([this.createInstallment()])),
          feeForm.removeControl('hourlyRateCaseWorker'),
          feeForm.removeControl('agreedValue'),
          feeForm.removeControl('amountOrPercentage')
        ) : (
          feeForm.removeControl('agreedFee'),
          feeForm.removeControl('advancePayment'),
          feeForm.removeControl('installments'),
          feeType == 3 ? (
            feeForm.setControl('hourlyRateCaseWorker', this.fb.control("0")),
            feeForm.setControl('isVATIncluded', this.fb.control("0")),
            feeForm.removeControl('agreedValue'),
            feeForm.removeControl('amountOrPercentage')
          ) : feeType == 4 ? (
            feeForm.setControl('agreedValue', this.fb.control('')),
            feeForm.setControl('amountOrPercentage', this.fb.control(0)),
            feeForm.setControl('isVATIncluded', this.fb.control(0)),
            feeForm.removeControl('hourlyRateCaseWorker')
          ) : (
            feeForm.removeControl('agreedFee'),
            feeForm.removeControl('advancePayment'),
            feeForm.removeControl('installments'),
            feeForm.removeControl('hourlyRateCaseWorker'),
            feeForm.removeControl('agreedValue'),
            feeForm.removeControl('amountOrPercentage'),
            feeForm.removeControl('isVATIncluded')
          )
        );
      });
    // this.incrementEditedFields(null, 'Payment Options', 'paymentOptions', mandatoryPaymentOptionsFields)
  }

  incrementEditedFields(clientType?: string | null, navItemTitle?: string, formGroupName?: string, mandatoryFields?: FormField[]) {
    if (clientType !== null) {
      const clients = this.stepForm.value[clientType !== ClientTypes.THIRDPARTY ? clientType + 's' : 'thirdParties'];
      var totalClients = 0;
      var totalClientApplicants = 0;
      var currentClients = 0;
      var currentClientApplicants = 0;
      clients.forEach((client: any) => {
        totalClients += mandatoryFieldsClient.length;
        mandatoryFieldsClient.forEach(({ field, type }) => {
          (client[field] != (type == 'select' ? 0 : type == 'input' ? '' : type == 'array' ? [] : null)) && currentClients++;
        });
        client.applicants.forEach((applicant: any) => {
          totalClientApplicants += mandatoryFieldsApplicant.length;
          mandatoryFieldsApplicant.forEach(({ field, type }) => {
            (applicant[field] != (type == 'select' ? 0 : type == 'input' ? '' : type == 'array' ? [] : null)) && currentClientApplicants++;
          })
        });
      });
      if (clientType == ClientTypes.PLAINTIFF) {
        this.totalPlaintiffs = totalClients + totalClientApplicants;
        this.currentPlaintiffs = currentClients + currentClientApplicants;
      } else if (clientType == ClientTypes.DEFENDANT) {
        this.totalDefendants = totalClients + totalClientApplicants;
        this.currentDefendants = currentClients + currentClientApplicants;
      } else if (clientType == ClientTypes.THIRDPARTY) {
        this.totalThirdParties = totalClients + totalClientApplicants;
        this.currentThirdParties = currentClients + currentClientApplicants;
      }
      this.navItems.filter(({ title }, i) => {
        if (title == 'Personal Information') {
          this.navItems[i].total = this.totalPlaintiffs + this.totalDefendants + this.totalThirdParties;
          this.navItems[i].current = this.currentPlaintiffs + this.currentDefendants + this.currentThirdParties;
        }
      })
    } else if (formGroupName && mandatoryFields && navItemTitle) {
      const formGroupDetails = this.stepForm.value[formGroupName];
      var currentFields = 0;
      var totalFields = 0;
      mandatoryFields.forEach(({ field, type, mandatoryFields: subFields }) => {
        if (type != 'group' && type != 'array') {
          (formGroupDetails[field] && formGroupDetails[field] != (
            type == 'select' ? 0
              : type == 'input' ? ''
                : type == 'date' ? ''
                  : type == 'boolean' ? false
                    : type == 'radio' ? null
                      : undefined)
          ) && currentFields++;
        } else if (type == 'array') {
          if (field == 'judges') {
            totalFields += formGroupDetails[field]?.length;
            formGroupDetails[field]?.forEach((arrayField: string) => {
              arrayField != '' && currentFields++;
            });
          } else if (field == 'installments') {
            formGroupDetails[field].forEach((installment: any) => {
              subFields?.forEach(({ field: subField, type: subType }) => {
                installment[subField] !== undefined && totalFields++;
                installment[subField]
                  && (installment[subField] != (
                    subType == 'select' ? 0
                      : subType == 'date' ? ''
                        : subType == 'input' ? ''
                          : subType == 'boolean' ? false
                            : subType == 'radio' ? null
                              : undefined)
                  ) && currentFields++;
              })
            });
          } else {
            formGroupDetails[field]?.length != 0 && currentFields++;
          }
          totalFields--;
        } else {
          subFields?.forEach(({ field: subField, type: subType }) => {
            formGroupDetails[field] && formGroupDetails[field][subField] !== undefined && totalFields++;
            formGroupDetails[field] && formGroupDetails[field][subField] && (
              formGroupDetails[field][subField] != (
                subType == 'select' ? 0
                  : subType == 'input' ? ''
                    : subType == 'date' ? ''
                      : subType == 'array' ? []
                        : null
              )
            ) && currentFields++;
          })
          totalFields--;
        }
        this.navItems.filter(({ title }, i) => {
          if (title == navItemTitle) {
            this.navItems[i].total = mandatoryFields.length + totalFields;
            this.navItems[i].current = currentFields;
          }
        })
      })
    }
    if (clientType !== null) {
      this.stepForm.controls[clientType !== ClientTypes.THIRDPARTY ? clientType + 's' : 'thirdParties']?.valueChanges.subscribe((clients) => {
        var totalClients = 0;
        var totalClientApplicants = 0;
        var currentClients = 0;
        var currentClientApplicants = 0;
        clients.forEach((client: any) => {
          totalClients += mandatoryFieldsClient.length;
          mandatoryFieldsClient.forEach(({ field, type }) => {
            (client[field] != (type == 'select' ? 0 : type == 'input' ? '' : type == 'array' ? [] : null)) && currentClients++;
          });
          client.applicants.forEach((applicant: any) => {
            totalClientApplicants += mandatoryFieldsApplicant.length;
            mandatoryFieldsApplicant.forEach(({ field, type }) => {
              (applicant[field] != (type == 'select' ? 0 : type == 'input' ? '' : type == 'array' ? [] : null)) && currentClientApplicants++;
            })
          });
        });
        if (clientType == ClientTypes.PLAINTIFF) {
          this.totalPlaintiffs = totalClients + totalClientApplicants;
          this.currentPlaintiffs = currentClients + currentClientApplicants;
        } else if (clientType == ClientTypes.DEFENDANT) {
          this.totalDefendants = totalClients + totalClientApplicants;
          this.currentDefendants = currentClients + currentClientApplicants;
        } else if (clientType == ClientTypes.THIRDPARTY) {
          this.totalThirdParties = totalClients + totalClientApplicants;
          this.currentThirdParties = currentClients + currentClientApplicants;
        }
        this.navItems.filter(({ title }, i) => {
          if (title == 'Personal Information') {
            this.navItems[i].total = this.totalPlaintiffs + this.totalDefendants + this.totalThirdParties;
            this.navItems[i].current = this.currentPlaintiffs + this.currentDefendants + this.currentThirdParties;
          }
        })
      })
    } else if (formGroupName && mandatoryFields && navItemTitle) {
      this.stepForm.controls[formGroupName].valueChanges.subscribe((formGroupDetails) => {
        var currentFields = 0;
        var totalFields = 0;
        mandatoryFields.forEach(({ field, type, mandatoryFields: subFields }) => {
          if (type != 'group' && type != 'array') {
            (formGroupDetails[field] && formGroupDetails[field] != (
              type == 'select' ? 0
                : type == 'input' ? ''
                  : type == 'date' ? ''
                    : type == 'boolean' ? false
                      : type == 'radio' ? null
                        : undefined)
            ) && currentFields++;
          } else if (type == 'array') {
            if (field == 'judges') {
              totalFields += formGroupDetails[field]?.length;
              formGroupDetails[field]?.forEach((arrayField: string) => {
                arrayField != '' && currentFields++;
              });
            } else if (field == 'installments') {
              formGroupDetails[field].forEach((installment: any) => {
                subFields?.forEach(({ field: subField, type: subType }) => {
                  installment[subField] !== undefined && totalFields++;
                  installment[subField]
                    && (installment[subField] != (
                      subType == 'select' ? 0
                        : subType == 'date' ? ''
                          : subType == 'input' ? ''
                            : subType == 'boolean' ? false
                              : subType == 'radio' ? null
                                : undefined)
                    ) && currentFields++;
                })
              });
            } else {
              formGroupDetails[field]?.length != 0 && currentFields++;
            }
            totalFields--;
          } else {
            subFields?.forEach(({ field: subField, type: subType }) => {
              formGroupDetails[field] && formGroupDetails[field][subField] !== undefined && totalFields++;
              formGroupDetails[field] && formGroupDetails[field][subField] && (
                formGroupDetails[field][subField] != (
                  subType == 'select' ? 0
                    : subType == 'input' ? ''
                      : subType == 'date' ? ''
                        : subType == 'array' ? []
                          : null
                )
              ) && currentFields++;
            });
            totalFields--;
          }
        });
        this.navItems.filter(({ title }, i) => {
          if (title == navItemTitle) {
            this.navItems[i].total = mandatoryFields.length + totalFields;
            this.navItems[i].current = currentFields;
          }
        })
      })
    }
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
            this.createClient(this.stepForm.value.plaintiffType)
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
      isLead: [false],
      title: [0],
      name: [client ? client?.name : ''],
      nickName: [''],
      gender: [0],
      fatherName: [client ? client?.fatherName : ''],
      companyName: [client ? client?.companyName : ''],
      CNIC: [client ? client?.CNIC : ''],
      phoneNumber: [client ? client?.phoneNumber : ''],
      whatsApp: [client ? client?.whatsApp : ''],
      email: [client ? client?.email : ''],
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

  overWriter: any;

  setLead(i: number, type: string, modal: any, e?: MouseEvent, a?: number) {
    (<FormGroup>(<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i]).controls.status.valueChanges.subscribe((status) => {
      if (status == 'lead') {
        (<FormGroup>(<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i]).controls.isLead.setValue(true)
      } else {
        (<FormGroup>(<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i]).controls.isLead.setValue(false)
      }
    })
    if (this.leadClient == null) {
      this.leadClient = i;
      this.leadType = type;
      this.leadApplicant = a;
    } else if (this.leadClient == i && this.leadType == type) {
      (<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i]
        .patchValue({
          status: null
        });
      this.leadClient = null;
      this.leadType = null;
      this.leadApplicant = null;
    } else {
      (<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i]
        .patchValue({
          status:
            (<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i].value.status == null ?
              null :
              (<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i].value.status
        });
      e?.stopPropagation();
      this.open(modal);
      this.overWriter = {
        i, type, modal, e, a
      }
    }
  }
  overwriteLead() {
    (<FormArray>this.stepForm.controls[this.leadType !== ClientTypes.THIRDPARTY ? this.leadType + 's' : 'thirdParties']!).controls[this.leadClient]
      .patchValue({
        status: null
      });
    this.leadClient = null;
    this.leadType = null;
    this.leadApplicant = null;
    const {i, type, modal, e, a} = this.overWriter;
    (<FormArray>this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties']!).controls[i]
      .patchValue({
        status: 'lead'
    });
    this.setLead(i, type, modal, e, a)
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
      if (!this.lawyerDetails && applicant.lawyerName !== null && applicant.lawyerFirmName !== null && applicant.lawyerAddress !== null && applicant.lawyerFax !== null && applicant.lawyerOtherDetails !== null) {
        this.lawyerDetails = applicantData.controls[applicantData.length - 1]
      }
      if (applicant.status != null) {
        let clientsData = (this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties'] as FormArray);
        let newApplicantData = ((clientsData.controls[i] as FormGroup).controls['applicants'] as FormArray);
        // if (applicant.status == 'lead') {
        //   if (!this.leadClient && !this.leadType) {
        //     clientsData.push(
        //       type == ClientTypes.PLAINTIFF ? this.createClient(this.stepForm.value.plaintiffType, applicant) : this.createClient(type, applicant)
        //     );
        //     newApplicantData.removeAt(i);
        //   } else if (newApplicantData.length - 1 == this.leadApplicant) {
        //     newApplicantData.controls[newApplicantData.length - 1].patchValue({
        //       status: null
        //     })
        //   }
        //   this.setLead(clientsData.length - 1, type, content, undefined, newApplicantData.length);
        // } else {
        //   clientsData.push(
        //     type == ClientTypes.PLAINTIFF ? this.createClient(this.stepForm.value.plaintiffType, applicant) : this.createClient(type, applicant)
        //   );
        //   newApplicantData.removeAt(i);
        // }
      }
    })
  }

  removeApplicantData(type: string, i: number, a: number) {
    const control = ((this.stepForm.controls[type !== ClientTypes.THIRDPARTY ? type + 's' : 'thirdParties'] as FormArray).controls[i] as FormGroup).controls['applicants'] as FormArray;
    control.removeAt(a);
  }

  addJudges() {
    ((<FormGroup>this.stepForm.controls.courtDetails).controls.judges as FormArray).clear();
    for (var i = 0; i < (this.stepForm.value.courtDetails.typeOfBench); i++) {
      ((<FormGroup>this.stepForm.controls.courtDetails).controls.judges as FormArray).push(this.fb.control(''))
    }
  }
  addJudge() {
    ((<FormGroup>this.stepForm.controls.courtDetails).controls.judges as FormArray).push(this.fb.control(''))
  }

  removeJudge(i: number) {
    const Judges = ((<FormGroup>this.stepForm.controls.courtDetails).controls.judges as FormArray);
    Judges.removeAt(i);
  }

  getInstallments() {
    return (<FormArray>(<FormGroup>this.stepForm.controls.paymentOptions.get('feeTypeForm')).get('installments')).controls;
  }
  checkAdvancePayment(){
    console.log(<FormArray>(<FormGroup>this.stepForm.controls.paymentOptions.get('feeTypeForm')).get('advancePayment'));
    
  }
  createInstallment() {
    return this.fb.group({
      installmentId: [0],
      dueDate: [new Date().toISOString().split("T")[0]],
      amount: [''],
      caseId: [0],
      isDeleted: [false],
    });
  }

  addInstallments() {
    const installmentData = (<FormGroup>this.stepForm.controls.paymentOptions.get('feeTypeForm')).get('installments') as FormArray;
    installmentData.push(this.createInstallment());
  }

  removeInstallments(index: any) {
    const control = <FormArray>(<FormGroup>this.stepForm.controls.paymentOptions.get('feeTypeForm')).controls['installments'];
    control.removeAt(index);
  }

  setNavigation(num: number) {
    let Diff = Math.abs(num - this.Navigation) + 1;
    this.Navigation <= num ?
      this.open(this.navItems[num - Diff].total == this.navItems[num - Diff].current ? this.NextModal : this.ErrorModal) :
      this.navigate(num)
  }

  navigate(to?: number) {
    setTimeout(() => !to ? this.Navigation++ : this.Navigation = to, 5);
  }

  getCategories() {
    this.caseService.getCategories().subscribe((res) => {
      this.categories = res.filter(({ categoryId }: any) => categoryId !== 11);
    });
  }

  getSubCategories() {
    this.subCategories = [];
    if (this.stepForm.value.caseDetails.categories.length == 0) {
      this.stepForm.controls.subcategories?.reset()
    } else {
      this.caseService.getSubCategories(this.stepForm.value.caseDetails.categories).subscribe((res) => {
        Object.keys(res).forEach((key, i) => {
          if (this.stepForm.value.caseDetails.categories.includes(12)) {
            this.subCategoriesDescription = [...this.subCategoriesDescription, ...res[key].filter((r: any) => r.categoryId == 12)];
            this.subCategoriesOffense = [...this.subCategoriesOffense, ...res[key].filter((r: any) => r.categoryId == 13)];
            res[key] = res[key].filter(({ categoryId }: any) => categoryId !== 12)
            res[key] = res[key].filter(({ categoryId }: any) => categoryId !== 13)
          }
          if (i !== Object.keys(res).length - 1) {
            res[key] = res[key].filter((r: any) => r.subCategoryId !== 0)
          }
          this.subCategories = [...this.subCategories, ...res[key]]
        });
        let subIDs = this.subCategories.map(({ subCategoryId }) => subCategoryId);
        (<FormGroup>this.stepForm.controls.caseDetails).controls.subcategories
          .setValue(this.stepForm.value.caseDetails.subcategories.filter((subCategoryId: any) => subIDs.includes(subCategoryId)))
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
    this.caseService.addNewCase(this.stepForm.value).subscribe((data) => {
      data.inserted == true && this.router.navigateByUrl('/cases')
    });
  }

  setPersonalInfo() {
    this.showPersonalDetails = true;
    this.setCaseTitle();
    this.stepForm.patchValue({
      isTemporaryCase: this.isTemporary
    })
  }

  get caseTitle() {
    let title = this.capitalize.transform(this.stepForm.value.plaintiffType);
    if (this.stepForm.value.plaintiffs?.length !== 0 && this.stepForm.value.defendants?.length !== 0) {
      if (this.stepForm.value.plaintiffs[0].nickName && this.stepForm.value.defendants[0].nickName) {
        return `${title} (1) - (${this.stepForm.value.plaintiffs[0].nickName.length <= 5 ? this.stepForm.value.plaintiffs[0].nickName : this.stepForm.value.plaintiffs[0].nickName.slice(0, 5) + '...'})${(this.stepForm.value.plaintiff != 1 && this.stepForm.value.plaintiff != 'single party matter') ? ' etc' : ''} vs Defendant (1) - (${this.stepForm.value.defendants[0].nickName.length <= 5 ? this.stepForm.value.defendants[0].nickName : this.stepForm.value.defendants[0].nickName.slice(0, 5) + '...'})${(this.stepForm.value.defendant != 1 && this.stepForm.value.defendant != 'single party matter') ? ' etc' : ''}`
      } else if (this.stepForm.value.plaintiffs[0].nickName) {
        return `${title} (1) - (${this.stepForm.value.plaintiffs[0].nickName.length <= 5 ? this.stepForm.value.plaintiffs[0].nickName : this.stepForm.value.plaintiffs[0].nickName.slice(0, 5) + '...'})${(this.stepForm.value.plaintiff != 1 && this.stepForm.value.plaintiff != 'single party matter') ? ' etc' : ''} vs Defendant (1)${(this.stepForm.value.defendant != 1 && this.stepForm.value.defendant != 'single party matter') ? ' etc' : ''}`
      } else if (this.stepForm.value.defendants[0].nickName) {
        return `${title} (1)${(this.stepForm.value.plaintiff != 1 && this.stepForm.value.plaintiff != 'single party matter') ? ' etc' : ''} vs Defendant (1) (${this.stepForm.value.defendants[0].nickName.length <= 5 ? this.stepForm.value.defendants[0].nickName : this.stepForm.value.defendants[0].nickName.slice(0, 5) + '...'})${(this.stepForm.value.defendant != 1 && this.stepForm.value.defendant != 'single party matter') ? ' etc' : ''}`
      } else {
        return `${title} (1)${(this.stepForm.value.plaintiff != 1 && this.stepForm.value.plaintiff != 'single party matter') ? ' etc' : ''} vs Defendant (1)${(this.stepForm.value.defendant != 1 && this.stepForm.value.defendant != 'single party matter') ? ' etc' : ''}`
      }
    }
    return
  }

  setCaseTitle() {
    (<FormGroup>this.stepForm.controls.caseDetails).controls.litigationCaseTitle.setValue(this.caseTitle);
  }
}
