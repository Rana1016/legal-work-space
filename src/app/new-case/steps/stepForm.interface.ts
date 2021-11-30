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
