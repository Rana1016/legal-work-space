import * as moment from "moment";

const SideNavItems = [
    {
        url: 'dashboard',
        text: 'Dashboard',
        icon: 'bar-chart'
    },
    {
        url: 'calendar',
        text: 'Calendar',
        icon: 'calendar'
    },
    {
        url: 'new-case',
        text: 'New Case',
        icon: 'plus-square'
    },
    {
        url: 'cases',
        text: 'Clients & Cases',
        icon: 'user'
    },
    {
        url: 'consultations',
        text: 'Consultations',
        icon: 'comments-o'
    },
    {
        url: 'case-activities/'+ moment(new Date).format('DD-MM-YYYY'),
        text: 'Case Activities',
        icon: 'edit'
    },
    {
        url: 'tasks',
        text: 'Tasks',
        icon: 'calendar-check-o'
    },
    {
        url: 'keydates',
        text: 'Key Dates',
        icon: 'calendar',
        badge: 4
    },
    {
        url: 'peshi-list',
        text: 'Peshi Lists',
        icon: 'files-o',
    },
    {
        url: 'contacts',
        text: 'Contact Book',
        icon: 'phone-square',
        badge: 2
    },
    {
        url: 'receipts',
        text: 'Receipt Book',
        icon: 'money'
    },
    {
        url: 'accounts',
        text: 'Accounts',
        icon: 'calculator'
    },
    {
        url: 'logs',
        text: 'Log Book',
        icon: 'pencil-square-o'
    },
    {
        url: 'reports',
        text: 'Reports',
        icon: 'line-chart'
    },
   
]

export default SideNavItems;