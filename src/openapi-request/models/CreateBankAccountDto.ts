/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateBankAccountDto = {
    customerOids: Array<string>;
    accountType: string;
    balance: number;
    currency: string;
    status: 'ON_REVIEW' | 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED' | 'CLOSED' | 'UNDER_REVIEW' | 'TERMINATED' | 'DELETED' | 'ARCHIVED' | 'BLOCKED' | 'FROZEN' | 'DORMANT' | 'SUSPENDED_FOR_VERIFICATION' | 'SUSPENDED_FOR_COMPLIANCE' | 'SUSPENDED_FOR_SECURITY' | 'SUSPENDED_FOR_FRAUD' | 'SUSPENDED_FOR_ABUSE';
};

