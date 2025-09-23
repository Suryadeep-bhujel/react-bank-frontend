import Dashboard from "@src/pages/admin/Dashboard";
import Login from "@src/pages/Login";
import BranchList from "@src/pages/admin/branch/BranchList";
import DashboardOutlet from "@src/pages/admin/DashboardOutlet";
import UserList from "@src/pages/admin/users/UserList";
import MyProfile from "@src/pages/admin/profile/MyProfile";
import RoleList from "@src/pages/admin/users/RoleList";
import PermissionList from "@src/pages/admin/users/PermissionList";
import BranchManagerList from "@src/pages/admin/branch/BranchManagerList";
import CustomerList from "@src/pages/admin/customers/CustomerList";
import CustomerApplicationList from "@src/pages/admin/customer-application/CustomerApplication";
import PermissionDetail from "@src/pages/admin/users/PermissionDetail";
import Countries from "@src/pages/admin/countries/Countries";
import BankAccount from "@src/pages/admin/accounts/BankAccounts";
import AddUpdateBankAccount from "@src/pages/admin/accounts/AddUpdateBankAccount";
import type { JSX } from "react";
import React from "react";
export interface RouteType {
    path: string;
    name: string;
    title: string;
    leftIcon?: string;
    rightIcon?: string;
    key: string;
    element?: JSX.Element;
    component?: JSX.Element;
    showInSidebar: boolean;
}
export const navigationList: RouteType[] = [
    {
        path: "/dashboard",
        name: "dashboard",
        key: "dashboard",
        title: "Dashboard",
        leftIcon: `<svg class="w-4 h-4 me-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>`,
        rightIcon: "",
        element: React.createElement(Dashboard),
        showInSidebar: true
    },
    {
        path: "/permissions",
        name: "roles-permissions",
        key: "roles-permissions",
        title: "Role's Permissions",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(PermissionList),
        showInSidebar: true
    },
    {
        path: "/roles",
        name: "roles",
        key: "roles",
        title: "Roles",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(RoleList),
        showInSidebar: true
    },
    {
        path: "roles/add-role",
        name: "add-role",
        key: "add-role",
        title: "Add Role",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(PermissionDetail),
        showInSidebar: false
    },
    {
        path: "roles/edit-role/:_oid",
        name: "edit-role",
        key: "edit-role",
        title: "Edit Role",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(PermissionDetail),
        showInSidebar: false
    },
    {
        path: "/user-list",
        name: "user-list",
        key: "user-list",
        title: "Users",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(UserList),
        showInSidebar: true
    },
    {
        path: "/branch-list",
        name: "branch-list",
        key: "branch-list",
        title: "Branch",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(BranchList),
        showInSidebar: true
    },
    {
        path: "/branch-managers",
        name: "branch-managers",
        key: "branch-managers",
        title: "Branch Managers",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(BranchManagerList),
        showInSidebar: true
    },
    {
        path: "/customer-list",
        name: "customer-list",
        key: "customer-list",
        title: "Customers",
        leftIcon: `<svg class="w-6 h-6 text-indigo-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
    <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
</svg>`,
        rightIcon: "",
        element: React.createElement(CustomerList),
        showInSidebar: true
    },
    {
        path: "/accounts",
        name: "accounts",
        key: "accounts",
        title: "Accounts",
        leftIcon: `<svg class="w-6 h-6 text-indigo-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
    <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
</svg>`,
        rightIcon: "",
        element: React.createElement(BankAccount),
        showInSidebar: true
    },
    {
        path: "accounts/add",
        name: "add-account",
        key: "add-account",
        title: "Add Account",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(AddUpdateBankAccount),
        showInSidebar: false
    },
    {
        path: "account/edit/:_oid",
        name: "edit-account",
        key: "edit-account",
        title: "Edit Account",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(AddUpdateBankAccount),
        showInSidebar: false
    },
    {
        path: "/cards",
        name: "cards",
        key: "cards",
        title: "Cards",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(AddUpdateBankAccount),
        showInSidebar: true
    },
    {
        path: "/loan-accounts",
        name: "loan-accounts",
        key: "loan-accounts",
        title: "Loan Accounts",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(AddUpdateBankAccount),
        showInSidebar: true
    },
    {
        path: "/customer-applications",
        name: "customer-applications",
        key: "customer-applications",
        title: "Applications",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(CustomerApplicationList),
        showInSidebar: true
    },
    {
        path: "/country-list",
        name: "country-list",
        key: "country-list",
        title: "Countries",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(Countries),
        showInSidebar: true
    }
]