import { environment } from "src/environments/environment";

export const ApiRoutes: API_ROUTES = {
    dashboard: {
        getStats: `${environment.baseUrl}dashboard/getDashboardStats`
    },
    cases: {
        all: `${environment.baseUrl}case/getCasesMinor`,
        caseDetails: `${environment.baseUrl}case/getCaseDetailByCaseId`,
        editCaseDetails: `${environment.baseUrl}case/updateCaseDetail`,
        isValid: `${environment.baseUrl}case/checkIfCaseExist`,
        categories: `${environment.baseUrl}case/categories`,
        subCategories: `${environment.baseUrl}case/subCategories`,
        addNewCase: `${environment.baseUrl}case/newCase`,
        personalDetails: `${environment.baseUrl}case/getPersonalDetailByCaseId`,
        editPersonalDetails: `${environment.baseUrl}case/updatePersonalDetail`,
        deleteProfile: `${environment.baseUrl}case/deleteProfile`
    },
    caseCategories: {
        all: `${environment.baseUrl}caseCategory/getCaseCategory`,
        add: `${environment.baseUrl}caseCategory/newCaseCategory`,
        byId: `${environment.baseUrl}caseCategory/getCaseCategoriesById`,
        update: `${environment.baseUrl}caseCategory/updateCaseCategory`,
        delete: `${environment.baseUrl}caseCategory/deleteCaseCategory`
    },
    installment: {
        overdue: `${environment.baseUrl}installment/getOverdueInsallments`
    },
    caseSubCategories: {
        all: `${environment.baseUrl}caseSubCategory/getCaseSubCategory`,
        add: `${environment.baseUrl}caseSubCategory/newCaseSubCategory`,
        byId: `${environment.baseUrl}caseSubCategory/getCaseSubCategoriesById`,
        update: `${environment.baseUrl}caseSubCategory/updateCaseSubCategory`,
        delete: `${environment.baseUrl}caseSubCategory/deleteCaseSubCategory`
    },
    clientPortal: {
        getInfo: `${environment.baseUrl}client/getClientInfoBycaseId`,
        toggleStatus: `${environment.baseUrl}client/setDisableEnable`,
        changePassword: `${environment.baseUrl}client/changePassword`,
        getCasesById: `${environment.baseUrl}client/getCasesByClientId`,
        getDocs: `${environment.baseUrl}client/getClientDocuments`,
    },
    common : {
        single: `${environment.baseUrl}common/uploadDocument`,
        multi: `${environment.baseUrl}common/uploadMultipleDocument`,
        documentsByCaseId: `${environment.baseUrl}common/getDocumentsByCaseId`
    },
    caseActivities: {
        all: `${environment.baseUrl}activity/getActivity`,
        allById: `${environment.baseUrl}activity/getActivitiesByCaseId`,
        allByDate: `${environment.baseUrl}activity/getActivitiesByCaseDate`,
        byId: `${environment.baseUrl}activity/getActivityById`,
        add: `${environment.baseUrl}activity/newActivity`,
        update: `${environment.baseUrl}activity/updateActivity`,
        delete: `${environment.baseUrl}activity/deleteActivity`,
    },
    caseStatus: {
        getCaseStatus: `${environment.baseUrl}case/getCaseStatus`,
        changeCaseStatus: `${environment.baseUrl}case/updateCaseStatus`,
    },
    calendarEvents: {
        add: `${environment.baseUrl}calendar/newEvent`,
        byUserId: `${environment.baseUrl}calendar/getEventsByUserId`,
        byId: `${environment.baseUrl}calendar/getEventById`,
        byDate: `${environment.baseUrl}calendar/getEventByDate`,
        bySearch: `${environment.baseUrl}calendar/getEventsBySearch`,
        update: `${environment.baseUrl}calendar/updateEvent`,
        delete: `${environment.baseUrl}calendar/deleteEvent`,
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
    consultation: {
        add: `${environment.baseUrl}consultation/newConsultation`,
        all: `${environment.baseUrl}consultation/getConsultation`,
        byId: `${environment.baseUrl}consultation/getConsultationById`,
        update: `${environment.baseUrl}consultation/updateConsultation`,
        delete: `${environment.baseUrl}consultation/deleteConsultation`,
        convert: `${environment.baseUrl}consultation/convertToCase`,
        byDateRange: `${environment.baseUrl}consultation/getConsultationsByDateRange`,
    },
    keyDates: {
        add: `${environment.baseUrl}keyDates/newKeyDates`,
        all: `${environment.baseUrl}keyDates/getKeyDates`,
        byCaseId: `${environment.baseUrl}keyDates/getkeyDatesByCaseId`,
        byId: `${environment.baseUrl}keyDates/getKeyDatesById`,
        update: `${environment.baseUrl}keyDates/updateKeyDates`,
        delete: `${environment.baseUrl}keyDates/deleteKeyDates`
    },
    user: {
        all: `${environment.baseUrl}user/getUsers`,
        add: `${environment.baseUrl}user/newUser`,
        byId: `${environment.baseUrl}user/getUsersById`,
        update: `${environment.baseUrl}user/updateUser`,
        delete: `${environment.baseUrl}user/deleteUser`,
        changePwd: ``
    },
    auth: {
        login: `${environment.baseUrl}user/authenticateUser`,
        getMenu: `${environment.baseUrl}user/getMenuByGroupId`
    },
    group: {
        all: `${environment.baseUrl}Group/getGroup`,
        add: `${environment.baseUrl}Group/newGroup`,
        byId: `${environment.baseUrl}Group/getGroupById`,
        update: `${environment.baseUrl}Group/updateGroup`,
        delete: `${environment.baseUrl}Group/deleteGroup`
    },
    contact: {
        all: `${environment.baseUrl}contact/getContact`,
        add: `${environment.baseUrl}contact/newContact`,
        byId: `${environment.baseUrl}contact/getContactById`,
        update: `${environment.baseUrl}contact/updateContact`,
        delete: `${environment.baseUrl}contact/deleteContact`,
        byContactGroupId:  `${environment.baseUrl}contact/getContactByGroupId`
    },
    contactGroup: {
        all: `${environment.baseUrl}contact/getContactGroup`,
        add: `${environment.baseUrl}contact/newContactGroup`,
        byId: `${environment.baseUrl}contact/getContactGroupById`,
        update: `${environment.baseUrl}contact/updateContactGroup`,
        delete: `${environment.baseUrl}contact/deleteContactGroup`,
        byUserId: `${environment.baseUrl}contact/getContactGroupsByUserId`,
    },
    logBook: {
        all: `${environment.baseUrl}logBook/getLogBook`,
        add: `${environment.baseUrl}logBook/newLogBook`,
        byId: `${environment.baseUrl}logBook/getLogBookById`,
        update: `${environment.baseUrl}logBook/updateLogBook`,
        delete: `${environment.baseUrl}logBook/deleteLogBook`,
        byLogBookFolderId:  `${environment.baseUrl}logBook/getLogBookByFolderId`
    },
    logBookFolder: {
        all: `${environment.baseUrl}logBook/getLogBookFolder`,
        add: `${environment.baseUrl}logBook/newLogBookFolder`,
        byId: `${environment.baseUrl}logBook/getLogBookFolderById`,
        update: `${environment.baseUrl}logBook/updateLogBookFolder`,
        delete: `${environment.baseUrl}logBook/deleteLogBookFolder`,
        byUserId:  `${environment.baseUrl}logBook/getLogBookFoldersByUserId`
    },
    timeKeep: {
        all: `${environment.baseUrl}timeKeep/getTimeKeep`,
        add: `${environment.baseUrl}timeKeep/newTimeKeep`,
        byId: `${environment.baseUrl}timeKeep/getTimeKeepById`,
        update: `${environment.baseUrl}timeKeep/updateTimeKeep`,
        delete: `${environment.baseUrl}timeKeep/deleteTimeKeep`,
        byCaseId: `${environment.baseUrl}timeKeep/getTimeKeepingsByCaseId`
    },
    location: {
        all: `${environment.baseUrl}location/getLocation`,
        add: `${environment.baseUrl}location/newLocation`,
        byId: `${environment.baseUrl}location/getLocationById`,
        update: `${environment.baseUrl}location/updateLocation`,
        delete: `${environment.baseUrl}location/deleteLocation`
    },
    tasks: {
        all: `${environment.baseUrl}tasks/getTasks`,
        add: `${environment.baseUrl}tasks/newTasks`,
        byId: `${environment.baseUrl}tasks/getTasksById`,
        update: `${environment.baseUrl}tasks/updateTasks`,
        delete: `${environment.baseUrl}tasks/deleteTasks`,
        byStatus: `${environment.baseUrl}activity/getTasksByStatus`,
        updateStatus: `${environment.baseUrl}case/updateTaskStatus`
    },
    peshi: {
        all: `${environment.baseUrl}peshi/getPeshi`,
        add: `${environment.baseUrl}peshi/newPeshi`,
        byId: `${environment.baseUrl}peshi/getPeshiById`,
        update: `${environment.baseUrl}peshi/updatePeshi`,
        delete: `${environment.baseUrl}peshi/deletePeshi`,
        byCaseId: `${environment.baseUrl}peshi/getPeshisByCaseId`
    },
    lookup: {
        get: `${environment.baseUrl}lookup/look`,
        add: `${environment.baseUrl}lookup/addNewLookUp`,
        edit: `${environment.baseUrl}lookup/editLookUp`,
    },
    notification: {
        get: `${environment.baseUrl}notification/getCounts`,
        update: `${environment.baseUrl}notification/updateSeenDate`,
    }
}

export interface API_ROUTES {
    dashboard: {
        getStats: string;
    };
    cases: {
        all: string;
        caseDetails: string;
        editCaseDetails: string;
        isValid: string;
        categories: string;
        subCategories: string;
        addNewCase: string;
        personalDetails: string;
        editPersonalDetails: string;
        deleteProfile: string;
    };
    installment: {
        overdue: string;
    };
    caseCategories: CommonAPIRoutes;
    caseSubCategories: CommonAPIRoutes;
    clientPortal: {
        getInfo: string;
        toggleStatus: string;
        changePassword: string;
        getCasesById: string;
        getDocs: string;
    };
    common: {
        single: string;
        multi: string;
        documentsByCaseId: string;
    };
    caseActivities: {
        all: string;
        allById: string;
        allByDate: string;
        byId: string;
        add: string;
        update: string;
        delete: string;
    };
    caseStatus: {
        getCaseStatus: string;
        changeCaseStatus: string;
    };
    calendarEvents: {
        add: string;
        byId: string;
        byDate: string;
        bySearch: string;
        update: string;
        delete: string;
        byUserId: string;
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
    consultation: CommonAPIRoutes & {
        convert: string;
        byDateRange: string;
    };
    logBook: CommonAPIRoutes & {
        byLogBookFolderId: string;
    };
    logBookFolder: CommonAPIRoutes & {
        byUserId: string;
    };
    keyDates: CommonAPIRoutes;
    user: CommonAPIRoutes & {
        changePwd: string;
    };
    auth: {
        login: string;
        getMenu?: string;
    };
    group: CommonAPIRoutes;
    contact: CommonAPIRoutes & {
        byContactGroupId: string;
    };
    contactGroup: CommonAPIRoutes & {
        byUserId: string;
    };
    timeKeep: CommonAPIRoutes;
    location: CommonAPIRoutes;
    tasks: CommonAPIRoutes & {
        updateStatus: string;
        byStatus: string;
    };
    lookup: {
        get: string;
        add: string;
        edit: string;
    };
    peshi: CommonAPIRoutes;
    notification: {
        get: string;
        update: string;
    };
}

interface CommonAPIRoutes {
    all: string;
    add: string;
    byId: string;
    update: string;
    delete: string;
    byCaseId?: string;
}