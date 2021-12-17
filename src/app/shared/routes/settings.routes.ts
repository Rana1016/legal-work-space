export const settings: SettingItem[] = [
    {
        url: 'global-settings',
        icon: "cog", text: 'Global Settings'

    },
    {
        url: 'bank-accounts', iconType: 'fa',
        icon: "university", text: 'Bank Accounts'

    },
    {
        url: 'office-locations',
        icon: "home", text: 'Office Locations'

    },
    {
        url: 'user-management',
        icon: "user", text: 'User Management'

    },
    {
        url: 'areas-of-practice',
        icon: "check", text: 'Areas of Practice'

    },
    {
        url: 'workflow-templates', iconType: 'fa',
        icon: "sitemap", text: 'Workflow Templates'

    },
    {
        url: 'hourly-rates',
        icon: "time", text: 'Hourly Rates'

    },
    {
        url: 'time-activity-codes',
        icon: "time", text: 'Time activity codes'

    },
    {
        url: 'vat-rates',
        icon: "edit", text: 'VAT Rates'

    },
    {
        url: 'documents', parentUrl: 'templates',
        icon: "duplicate", text: 'Document Templates'

    },
    {
        url: 'quiz',
        icon: "edit", text: 'Questionnaire Management'

    },
    {
        url: 'calendar',
        icon: "calendar", text: 'Calendar Settings'

    },
    {
        url: 'contacts',
        icon: "book", text: 'Contact Book Settings'

    },
];

export interface SettingItem {
    url: string;
    iconType?: string;
    icon: string;
    text: string;
    parentUrl?: string;
}
