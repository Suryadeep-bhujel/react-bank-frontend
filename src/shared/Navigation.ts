export interface RouteType {
    path: string;
    name: string;
    title: string;
    leftIcon?: string;
    rightIcon?: string;
}
export const navigationList: RouteType[] = [
    {
        path: "/dashboard",
        name: "dashboard",
        title: "Dashboard",
        leftIcon: "",
        rightIcon: "",
    },
    {
        path: "/permissions",
        name: "roles-permissions",
        title: "Role's Permissions",
        leftIcon: "",
        rightIcon: "",
    },
    {
        path: "/roles",
        name: "roles",
        title: "Roles",
        leftIcon: "",
        rightIcon: "",
    },
    {
        path: "/user-list",
        name: "user-list",
        title: "Users",
        leftIcon: "",
        rightIcon: "",
    },
    {
        path: "/branch-list",
        name: "branch-list",
        title: "Branch",
        leftIcon: "",
        rightIcon: "",
    },
    {
        path: "/branch-managers",
        name: "branch-managers",
        title: "Branch Managers",
        leftIcon: "",
        rightIcon: "",
    },
    {
        path: "/customer-list",
        name: "customer-list",
        title: "Customers",
        leftIcon: `<svg class="w-6 h-6 text-indigo-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
    <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
</svg>`,
        rightIcon: "",
    },
    {
        path: "/accounts",
        name: "accounts",
        title: "Accounts",
        leftIcon: `<svg class="w-6 h-6 text-indigo-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
    <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
</svg>`,
        rightIcon: "",
    },
    {
        path: "/cards",
        name: "cards",
        title: "Cards",
        leftIcon: "",
        rightIcon: "",
    },
    {
        path: "/loan-accounts",
        name: "loan-accounts",
        title: "Loan Accounts",
        leftIcon: "",
        rightIcon: "",
    },
    {
        path: "/customer-applications",
        name: "customer-applications",
        title: "Applications",
        leftIcon: "",
        rightIcon: "",
    },
    {
        path: "/country-list",
        name: "country-list",
        title: "Countries",
        leftIcon: "",
        rightIcon: "",
    }
]