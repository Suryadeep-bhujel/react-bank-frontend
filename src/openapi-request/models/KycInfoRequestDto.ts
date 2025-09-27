/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type KycInfoRequestDto = {
    kycDocumentProvided: 'YES' | 'NO' | 'NOT_APPLICABLE';
    nominationRequired: 'YES' | 'NO' | 'NOT_APPLICABLE';
    introducerName?: string;
    panNumber: string;
    kycDocumentType: 'PASSPORT' | 'NATIONAL_ID' | 'AADHAAR' | 'DRIVING_LICENSE' | 'VOTER_ID' | 'SOCIAL_SECURITY_NUMBER' | 'TAX_IDENTIFICATION_NUMBER' | 'RESIDENCE_PERMIT' | 'BIRTH_CERTIFICATE' | 'CITIZENSHIP_CERTIFICATE' | 'NRIC' | 'HEALTH_CARD' | 'MILITARY_ID' | 'STUDENT_ID' | 'EMPLOYEE_ID' | 'OTHER' | 'UNDISCLOSED';
    officialIdNo: string;
    perAnnumIncome?: number;
    requestedAddOn: 'YES' | 'NO' | 'NOT_APPLICABLE';
};

