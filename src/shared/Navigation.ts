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
import CreditAndDabitCardList from "@src/pages/admin/cards/CreditAndDabitCard";
import LoanAccountsList from "@src/pages/admin/accounts/LoanAccounts";
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
    subMenus?: RouteType[];
    isParent: boolean;
}
export const navigationList: RouteType[] = [
    {
        path: "/dashboard",
        name: "dashboard",
        key: "dashboard",
        title: "Dashboard",
        leftIcon: `<svg class="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>`,
        rightIcon: "",
        element: React.createElement(Dashboard),
        showInSidebar: true,
        isParent: true,
    },
    {
        path: "/user-management",
        name: "user-management",
        key: "user-management",
        title: "User Management",
        leftIcon: `<svg class="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        </svg>`,
        rightIcon: `<svg class="w-4 h-4 text-current transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
        </svg>`,
        element: React.createElement(UserList),
        showInSidebar: true,
        isParent: true,
        subMenus: [
            {
                path: "/user-list",
                name: "user-list",
                key: "user-list",
                title: "Users",
                leftIcon: `<svg class="w-4 h-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>`,
                rightIcon: "",
                element: React.createElement(UserList),
                showInSidebar: false,
                isParent: false,
            },
            {
                path: "/roles",
                name: "roles",
                key: "roles",
                title: "Roles",
                leftIcon: `<svg class="w-4 h-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>`,
                rightIcon: "",
                element: React.createElement(RoleList),
                showInSidebar: false,
                isParent: false,
            },
            {
                path: "/permissions",
                name: "roles-permissions",
                key: "roles-permissions",
                title: "Role's Permissions",
                leftIcon: `<svg class="w-4 h-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>`,
                rightIcon: "",
                element: React.createElement(PermissionList),
                showInSidebar: false,
                isParent: false,
            }
        ]
    },
    {
        path: "roles/add-role",
        name: "add-role",
        key: "add-role",
        title: "Add Role",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(PermissionDetail),
        showInSidebar: false,
        isParent: true,
    },
    {
        path: "roles/edit-role/:_oid",
        name: "edit-role",
        key: "edit-role",
        title: "Edit Role",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(PermissionDetail),
        showInSidebar: false,
        isParent: true,
    },
    {
        path: "/branch-list",
        name: "branch-list",
        key: "branch-list",
        title: "Branch Mgmt.",
        leftIcon: `<svg class="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clip-rule="evenodd"/>
        </svg>`,
        rightIcon: `<svg class="w-4 h-4 text-current transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
        </svg>`,
        element: React.createElement(BranchList),
        showInSidebar: true,
        isParent: true,
        subMenus: [
            {
                path: "/branch-list",
                name: "branch-list",
                key: "branch-list",
                title: "Branches",
                leftIcon: `<svg class="w-4 h-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clip-rule="evenodd"/>
                </svg>`,
                rightIcon: "",
                element: React.createElement(BranchList),
                showInSidebar: false,
                isParent: false,
            },
            {
                path: "/branch-managers",
                name: "branch-managers",
                key: "branch-managers",
                title: "Branch Managers",
                leftIcon: `<svg class="w-4 h-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>`,
                rightIcon: "",
                element: React.createElement(BranchManagerList),
                showInSidebar: false,
                isParent: false,
            }
        ]
    },
    {
        path: "/customer-list",
        name: "customer-list",
        key: "customer-list",
        title: "Customers",
        leftIcon: `<svg class="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>`,
        rightIcon: "",
        element: React.createElement(CustomerList),
        showInSidebar: true,
        isParent: true,
    },
    {
        path: "/accounts-management",
        name: "accounts-management",
        key: "accounts-management",
        title: "Account Mgmt.",
        leftIcon: `<svg class="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
        </svg>`,
        rightIcon: `<svg class="w-4 h-4 text-current transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
        </svg>`,
        element: React.createElement(BankAccount),
        showInSidebar: true,
        isParent: true,
        subMenus: [
            {
                path: "/accounts",
                name: "accounts",
                key: "accounts",
                title: "Bank Accounts",
                leftIcon: `<svg class="w-4 h-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z"/>
                </svg>`,
                rightIcon: "",
                element: React.createElement(BankAccount),
                showInSidebar: false,
                isParent: false,
            },
            {
                path: "/credit-cards",
                name: "Credit Cards",
                key: "credit-cards",
                title: "Credit Cards",
                leftIcon: `<svg class="w-4 h-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1H4v8h12V6z" clip-rule="evenodd"/>
                </svg>`,
                rightIcon: "",
                element: React.createElement(CreditAndDabitCardList),
                showInSidebar: true,
                isParent: false,
            },
            {
                path: "/debit-cards",
                name: "Debit Cards",
                key: "debit-cards",
                title: "Debit Cards",
                leftIcon: `<svg class="w-4 h-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1H4v8h12V6z" clip-rule="evenodd"/>
                </svg>`,
                rightIcon: "",
                element: React.createElement(CreditAndDabitCardList),
                showInSidebar: true,
                isParent: false,
            },
            {
                path: "/loan-accounts",
                name: "loan-accounts",
                key: "loan-accounts",
                title: "Loan Accounts",
                leftIcon: `<svg class="w-4 h-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                </svg>`,
                rightIcon: "",
                element: React.createElement(LoanAccountsList),
                showInSidebar: false,
                isParent: false,
            }
        ]
    },
    {
        path: "accounts/add",
        name: "add-account",
        key: "add-account",
        title: "Add Account",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(AddUpdateBankAccount),
        showInSidebar: false,
        isParent: true,
    },
    {
        path: "account/edit/:_oid",
        name: "edit-account",
        key: "edit-account",
        title: "Edit Account",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(AddUpdateBankAccount),
        showInSidebar: false,
        isParent: true,
    },
    {
        path: "/customer-applications",
        name: "customer-applications",
        key: "customer-applications",
        title: "Applications",
        leftIcon: "",
        rightIcon: "",
        element: React.createElement(CustomerApplicationList),
        showInSidebar: true,
        isParent: true,
    },
    {
        path: "/country-list",
        name: "country-list",
        key: "country-list",
        title: "Countries",
        leftIcon: `<svg class="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"/>
        </svg>`,
        rightIcon: "",
        element: React.createElement(Countries),
        showInSidebar: true,
        isParent: true,
    }
]