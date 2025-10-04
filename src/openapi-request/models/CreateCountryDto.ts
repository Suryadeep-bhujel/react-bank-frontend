/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateCountryDto = {
    _oid?: string;
    countryName: string;
    countryCode: string;
    dialCode: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ON_HOLD' | 'BLACK_LISTED';
    sanctionStatus?: 'SANCTIONED' | 'NOT_SANCTIONED' | 'PENDING' | 'UNDER_REVIEW' | 'CLEARED';
};

