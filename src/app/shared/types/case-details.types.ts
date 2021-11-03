export interface caseDetail {
    title: string;
    selector?: string;
    component?: new () => any;
    active?: boolean;
}