export default interface stepValueInterface {
  caseId: number;
  isTemporaryCase: boolean;
  modeOfCorrespondence: string;
  howDidYouHear: string;
  categoryId: number;
  subCategoryId: number;
  briefCaseDescription: string;
  caseSuperVisor: number;
  caseworker: number;
  clientInstructions: string;
  adviceGivenToClient: string;
  agreedPlanOfAction: string;
  chancesOfSuccess: string;
  weaknessesOfCase: string;
  conflictsOfInterest: string;
  conflictsOfInterestDesc: string;
  haveCriminalConviction: boolean;
  criminalConvictionDesc: string;
  addtionalInfo: string;
  feeType: string;
  coveredByFee: string;
  agreedAmountOrPercentage: number;
  isVATIncluded: boolean;
  advancePayment: number;
  courtId: number;
  isMatter: boolean;
  parentId: number;
  hourlyRateCaseworker: number;
  isDeleted: boolean;
}

export interface clientFormInterface {
  clientId: number;
  lead: boolean;
  isContactPerson: boolean;
  isOtherApplicant: boolean;
  plaintiff: string;
  defendant: string;
  clientName: string;
  fatherName: string;
  companyName: string;
  cnic: string;
  clientAddress: string;
  companyAddress: string;
  phoneNumber: string;
  clientEmail: string;
  fax: string;
  whatsAppNumber: string;
  otherDetails: string;
  isMainClient: boolean;
  caseId: number;
  lawyerName: string;
  lawyerFirmName: string;
  lawyerAddress: string;
  lawyerPhoneNumber: string;
  lawyerEmail: string;
  lawyerFax: string;
  lawyerWhatsAppNumber: string;
  lawyerOtherDetails: string;
}

export interface installmentFormInterface {
  installmentId: number;
  dueDate: Date;
  amount: number;
  caseId: number;
  isDeleted: boolean;
}

export interface FormField {
  field: string;
  type: string;
  mandatoryFields?: FormField[];
}

export interface stepFormInterface {
  caseId: number;
  caseDetails: {
    clientInstructions: string;
    categories: Option[];
    subcategories: Option[];
    subCategoriesDescription: Option[];
    subCategoriesOffense: Option[];
    lescoCase: boolean;
    lescoType: string; // SE Or CLO
    lescoGroup: {
      cloDivision: string | undefined,
      cloSubDivision: string | undefined,
      cloConsumerRef: string | undefined,
      cloClerkName: string | undefined,
      seCircle: select | number | undefined,
      seDivision: string | undefined,
      seSubDivision: string | undefined,
      seConsumer: string | undefined,
      seClerkName: string | undefined
    },
    briefCaseDescription: string;
    caseInstructions: select | number;
    litigationCaseTitle: string;
    dateOfLastHearing: string;
    dateOfNextHearing: string;
    filingDate: string;
    courtCaseNumber: string;
    adviceGivenToClient: string;
    agreedPlanOfAction: string;
    chancesOfSuccess: select | number;
    weaknessesOfCase: string;
    conflictsOfInterest: select | number;
    conflictsOfInterestDesc: string;
    haveCriminalConviction: select | number;
    criminalConvictionDesc: string;
    addtionalInfo: string;
  };
  teamDetails: {
    caseSource: select | number;
    caseOwner: select | number;
    caseSuperVisor: select | number;
    caseWorker: select | number;
    caseClerk: select | number;
  };
  courtDetails: {
    nameOfCourt: select | number;
    typeOfBench: select | number;
    judges: string[];
    districtOrBenchOrTehsil: string;
    anyOtherDetails: string;
  };
  paymentOptions: {
    feeType: select | number;
    coveredByFeeAgreement: string;
    agreedFee: string;
    isVATIncluded: select | number;
    advancePayment: string;
    installments: installmentInterface[];
  };
  plaintiffType: string;
  thirdParty: select | number;
  plaintiffs: clientInterface[];
  defendants: clientInterface[];
  thirdParties: clientInterface[];
}

interface clientInterface {
  type: string;
  status: null | string;
  title: select | number;
  name: string;
  nickName: string;
  gender: select | number;
  fatherName: string;
  companyName: string;
  CNIC: string;
  phoneNumber: string;
  whatsApp: string;
  email: string;
  address: string;
  companyAddress: string;
  otherDetails: string;
  isLead: boolean;
  isContactPerson: boolean;
  cpName: string;
  cpFatherName: string;
  cpCompanyName: string;
  cpCNIC: string;
  cpPhoneNumber: string;
  cpWhatsApp: string;
  cpEmail: string;
  cpAddress: string;
  cpOtherDetails: string;
  applicants: applicantInterface[];
}
interface applicantInterface {
  clientId: select | number;
  applicantId: select | number;
  status: null | string;
  isLead: boolean;
  name: string;
  fatherName: string;
  companyName: string;
  CNIC: string;
  address: string;
  companyAddress: string;
  phoneNumber: string;
  email: string;
  fax: string;
  whatsApp: string;
  otherDetails: string;
  lawyerName: string;
  lawyerFirmName: string;
  lawyerAddress: string;
  lawyerPhoneNumber: string;
  lawyerEmail: string;
  lawyerFax: string;
  lawyerWhatsApp: string;
  lawyerOtherDetails: string;
}

interface installmentInterface {
  dueDate: string;
  amount: string;
}

interface select {}

interface Option {
  label: string,
  value: string
}