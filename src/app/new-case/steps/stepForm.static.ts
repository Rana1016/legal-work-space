import { FormField } from './stepForm.interface';

export const mandatoryFieldsClient: FormField[] = [
  {
    field: 'status',
    type: 'radio',
  },
  {
    field: 'title',
    type: 'select',
  },
  {
    field: 'name',
    type: 'input',
  },
  {
    field: 'gender',
    type: 'input',
  },
  {
    field: 'fatherName',
    type: 'input',
  },
  {
    field: 'companyName',
    type: 'input',
  },
  {
    field: 'CNIC',
    type: 'input',
  },
  {
    field: 'address',
    type: 'input',
  },
  {
    field: 'companyAddress',
    type: 'input',
  },
  {
    field: 'otherDetails',
    type: 'input',
  },
];

export const mandatoryFieldsApplicant: FormField[] = [
  { field: 'lawyerName', type: 'input' },
  { field: 'lawyerFirmName', type: 'input' },
  { field: 'lawyerAddress', type: 'input' },
  { field: 'lawyerFax', type: 'input' },
  { field: 'lawyerOtherDetails', type: 'input' },
];

export const mandatoryTeamDetailsFields: FormField[] = [
  { field: 'caseSource', type: 'select' },
  { field: 'caseOwner', type: 'select' },
  { field: 'caseSuperVisor', type: 'select' },
  { field: 'caseWorker', type: 'select' },
  { field: 'caseClerk', type: 'select' },
];

export const mandatoryCaseDetailsFields: FormField[] = [
  {
    field: 'clientInstructions',
    type: 'input',
  },
  {
    field: 'categories',
    type: 'array',
  },
  {
    field: 'subcategories',
    type: 'array',
  },
  //   {
  //     field: 'subCategoriesDescription',
  //     type: 'array',
  //   },
  //   {
  //     field: 'subCategoriesOffense',
  //     type: 'array',
  //   },
  {
    field: 'lescoCase',
    type: 'boolean',
  },
  {
    field: 'lescoType',
    type: 'boolean',
  },
  {
    field: 'lescoGroup',
    type: 'group',
    mandatoryFields: [
      { field: 'cloDivision', type: 'input' },
      { field: 'cloSubDivision', type: 'input' },
      { field: 'cloConsumerRef', type: 'input' },
      { field: 'cloClerkName', type: 'input' },
      { field: 'seCircle', type: 'select' },
      { field: 'seDivision', type: 'input' },
      { field: 'seSubDivision', type: 'input' },
      { field: 'seConsumer', type: 'input' },
      { field: 'seClerkName', type: 'input' },
    ],
  },
  {
    field: 'briefCaseDescription',
    type: 'input',
  },
  {
    field: 'caseInstructions',
    type: 'select',
  },
  {
    field: 'litigationCaseTitle',
    type: 'input',
  },
  {
    field: 'filingDate',
    type: 'date',
  },
  {
    field: 'courtCaseNumber',
    type: 'input',
  },
  {
    field: 'chancesOfSuccess',
    type: 'select',
  },
  {
    field: 'conflictsOfInterest',
    type: 'select',
  },
  {
    field: 'haveCriminalConviction',
    type: 'select',
  },
];

export const mandatoryCourtDetailsFields: FormField[] = [
  { field: 'nameOfCourt', type: 'select' },
  { field: 'typeOfBench', type: 'select' },
  { field: 'judges', type: 'array' },
  { field: 'districtOrBenchOrTehsil', type: 'input' },
  { field: 'anyOtherDetails', type: 'input' },
];

export const mandatoryPaymentOptionsFields: FormField[] = [
  { field: 'feeType', type: 'select' },
  {
    field: 'feeTypeForm', type: 'group', mandatoryFields: [
      { field: 'coveredByFeeAgreement', type: 'input' },
      { field: 'agreedFee', type: 'input' },
      { field: 'isVATIncluded', type: 'select' },
      { field: "hourlyRateCaseWorker", type: 'select' },
      { field: 'agreedValue', type: 'input' },
      { field: "amountOrPercentage", type: 'select' },
      { field: "advancePayment", type: 'input' },
      {
        field: 'installments', type: 'array', mandatoryFields: [
          {
            field: 'dueDate',
            type: 'date'
          },
          {
            field: 'amount',
            type: 'input'
          }
        ]
      },
    ]
  }
]
