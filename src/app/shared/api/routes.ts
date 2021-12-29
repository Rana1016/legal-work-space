import { environment } from "src/environments/environment";

export const ApiRoutes: API_ROUTES = {
    cases: {
        all: `${environment.baseUrl}case/getCasesMinor`,
        byCaseId: `${environment.baseUrl}case/getCaseDetailByCaseId`,
        isValid: `${environment.baseUrl}case/checkIfCaseExist`,
        categories: `${environment.baseUrl}case/categories`,
        subCategories: `${environment.baseUrl}case/subCategories`,
        addNewCase: `${environment.baseUrl}case/newCase`
    },
    caseActivities: {
        all: `${environment.baseUrl}activity/getActivity`,
        allById: `${environment.baseUrl}activity/getActivityByCaseId`
    },
    caseStatus: {
        getCaseStatus: `${environment.baseUrl}case/getCaseStatus`,
        changeCaseStatus: `${environment.baseUrl}case/updateCaseStatus`,
    },
    caseAml: {
        getById: `${environment.baseUrl}case/getAMLByCaseId`,
        addAmlList: `${environment.baseUrl}case/addNewAMLList`,
        checkAML: `${environment.baseUrl}case/checkAMLItem`
    },
    caseNotes: {
        getById: `${environment.baseUrl}note/getNotes`,
        addNote: `${environment.baseUrl}note/newNote`,
        deleteNote: `${environment.baseUrl}note/deleteNote`
    },
    keyDates: {
        getById: `${environment.baseUrl}keyDates/getKeyDatesById`,
        all: `${environment.baseUrl}keyDates/getKeyDates`
    },
    user: {
        all: `${environment.baseUrl}user/getUsers`,
        addUser: `${environment.baseUrl}user/newUser`,
        byId: `${environment.baseUrl}user/getUsersById`,
        update: `${environment.baseUrl}user/updateUser`,
        delete: `${environment.baseUrl}user/deleteUser`
    },
    group: {
        all: `${environment.baseUrl}Group/getGroup`,
        addGroup: `${environment.baseUrl}Group/newGroup`,
        byId: `${environment.baseUrl}Group/getGroupById`,
        update: `${environment.baseUrl}Group/updateGroup`,
        delete: `${environment.baseUrl}Group/deleteGroup`
    },
    lookup: {
        get: `${environment.baseUrl}lookup/look`,
    }
}

export interface API_ROUTES {
    cases: {
        all: string;
        byCaseId: string;
        isValid: string;
        categories: string;
        subCategories: string;
        addNewCase: string;
    },
    caseActivities: {
        all: string;
        allById: string;
    };
    caseStatus: {
        getCaseStatus: string;
        changeCaseStatus: string;
    };
    caseAml: {
        getById: string;
        addAmlList: string;
        checkAML: string;
    };
    caseNotes: {
        getById: string;
        addNote: string;
        deleteNote: string
    };
    keyDates: {
        getById: string;
        all: string;
    };
    user: {
        all: string;
        addUser: string;
        byId: string;
        update: string;
        delete: string;
    };
    group: {
        all: string;
        addGroup: string;
        byId: string;
        update: string;
        delete: string;
    }
    lookup: {
        get: string;
    }
}