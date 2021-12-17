import { environment } from "src/environments/environment";

export const ApiRoutes: API_ROUTES = {
    cases: {
        all: `${environment.baseUrl}case/getCasesMinor`,
        isValid: `${environment.baseUrl}case/checkIfCaseExist`,
        categories: `${environment.baseUrl}case/categories`,
        subCategories: `${environment.baseUrl}case/subCategories`,
        addNewCase: `${environment.baseUrl}case/newCase`,
        activities: {
            all: `${environment.baseUrl}activity/getActivity`,
            allById: `${environment.baseUrl}activity/getActivityByCaseId`
        }
    },
    caseDetails: {
        case: `${environment.baseUrl}case/getCaseDetailByCaseId`,
        aml: {
            getById: `${environment.baseUrl}case/getAMLByCaseId`,
            addAmlList: `${environment.baseUrl}case/addNewAMLList`,
            checkAML: `${environment.baseUrl}case/checkAMLItem`
        },
        status: {
            getCaseStatus: `${environment.baseUrl}case/getCaseStatus`,
            changeCaseStatus: `${environment.baseUrl}case/updateCaseStatus`,
        },
        keydates: {
            getById: `${environment.baseUrl}keyDates/getKeyDatesById`,
            all: `${environment.baseUrl}keyDates/getKeyDates`
        },
        notes: {
            getById: `${environment.baseUrl}note/getNotes`,
            addNote: `${environment.baseUrl}note/newNote`,
            deleteNote: `${environment.baseUrl}note/deleteNote`
        }
    }
}

export interface API_ROUTES {
    cases: {
        all: string;
        isValid: string;
        categories: string;
        subCategories: string;
        addNewCase: string;
        activities: {
            all: string;
            allById: string;
        }
    },
    caseDetails: {
        case: string;
        aml: {
            getById: string;
            addAmlList: string;
            checkAML: string;
        };
        status : {
            getCaseStatus: string;
            changeCaseStatus: string;
        };
        keydates: {
            getById: string;
            all: string;
        },
        notes: {
            getById: string;
            addNote: string;
            deleteNote: string
        }
    }
}