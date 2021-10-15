export interface newCaseInterface
{
    ///step1
    title?: number,
    firstName?: string,
    lastName?: string,
    dateOfBirth?: Date,
    gender?: number,
    nationality?: string,
    companyName?: string,
    address?: string,
    city?: string,
    country?: number,
    zipCode?: string,
    email?: string,
    phonePrimary?: string,
    phoneSecondary?: string,
    preferredMode?: number,
    hearAboutUs?: number,
     ////step2
    category?: number,
    subCategory?: number,
    briefCaseDesc?: string
    caseSupervisor?: number,
    caseWorker?: number,
    clientsInstruction?: string,
    AdviceToClient?: string,
    agreedPlanAction?: string,
    chancesOfSuccess?: number,
    weaknessOfCase?: string,
    conflictOfInterest?: boolean,
    conflictOfInterestExplain: string;
    criminalConvictions?: boolean,
    explaination?: string,
    additionalInformation?:string
    
    /////// step3
    feeType?: number,
    coveredByAgreement?: string,
    agreedFee?: string,
    IsVatApplicable?: boolean,
    advancedPayment?: number,
    installmentDueDate?: Date,
    installmentAmount?: number,
   
    
}
export interface step1Interface{
    title?: number,
    firstName?: string,
    lastName?: string,
    dateOfBirth?: Date,
    gender?: number,
    nationality?: string,
    companyName?: string,
    address?: string,
    city?: string,
    country?: number,
    zipCode?: string,
    email?: string,
    phonePrimary?: string,
    phoneSecondary?: string,
    preferredMode?: number,
    hearAboutUs?: number,
}
export interface step2Interface
{
    category?: number,
    subCategory?: number,
    briefCaseDesc?: string
    caseSupervisor?: number,
    caseWorker?: number,
    clientsInstruction?: string,
    AdviceToClient?: string,
    agreedPlanAction?: string,
    chancesOfSuccess?: number,
    weaknessOfCase?: string,
    conflictOfInterest?: boolean,
    conflictOfInterestExplain: string;
    criminalConvictions?: boolean,
    explaination?: string,
    additionalInformation?: string
}
export interface step3Interface
{
    feeType?: number,
    coveredByAgreement?: string,
    agreedFee?: string,
    IsVatApplicable?: boolean,
    advancedPayment?: number,
    installmentDueDate?: Date,
    installmentAmount?: number,
}