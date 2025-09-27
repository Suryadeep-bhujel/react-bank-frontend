/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AccountInfoRequestDto = {
    branchCode: string;
    accountType: 'PERSONAL' | 'SAVINGS' | 'CHECKING_OR_CURRENT' | 'JOINT' | 'BUSINESS' | 'SALARY' | 'FIXED_DEPOSIT' | 'RECURRING_DEPOSIT' | 'NRI' | 'TRUST' | 'STUDENT' | 'RETIREMENT' | 'INVESTMENT' | 'LOAN';
    status: 'ON_REVIEW' | 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED' | 'CLOSED' | 'UNDER_REVIEW' | 'TERMINATED' | 'DELETED' | 'ARCHIVED' | 'BLOCKED' | 'FROZEN' | 'DORMANT' | 'SUSPENDED_FOR_VERIFICATION' | 'SUSPENDED_FOR_COMPLIANCE' | 'SUSPENDED_FOR_SECURITY' | 'SUSPENDED_FOR_FRAUD' | 'SUSPENDED_FOR_ABUSE';
};

