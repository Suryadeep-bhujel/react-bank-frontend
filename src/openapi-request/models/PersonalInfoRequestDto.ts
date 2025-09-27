/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PersonalInfoRequestDto = {
    title?: 'MR' | 'MRS' | 'MISS' | 'MS' | 'DR' | 'PROF' | 'REV' | 'OTHER' | 'UNDISCLOSED';
    firstName: string;
    middleName?: string;
    lastName: string;
    guardianName: string;
    gender: 'MALE' | 'FEMALE' | 'NON_BINARY' | 'OTHER' | 'UNDISCLOSED';
    dateOfBirth: string;
    maritalStatus: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED' | 'SEPARATED' | 'PARTNERED' | 'UNDISCLOSED';
    category: 'GENERAL' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'BRAHMIN' | 'CHHETRI' | 'NEWAR' | 'TAMANG' | 'MAGAR' | 'RAI' | 'LIMBU' | 'SHERPA' | 'THARU' | 'DALIT' | 'OTHER' | 'UNDISCLOSED';
    occupation: 'UNEMPLOYED' | 'STUDENT' | 'SELF_EMPLOYED' | 'EMPLOYED' | 'RETIRED' | 'BUSINESS_OWNER' | 'FREELANCER' | 'GOVERNMENT_EMPLOYEE' | 'PRIVATE_SECTOR_EMPLOYEE' | 'AGRICULTURE' | 'HOMEMAKER' | 'MILITARY' | 'TEACHER' | 'ENGINEER' | 'DOCTOR' | 'LAWYER' | 'ARTIST' | 'SCIENTIST' | 'OTHER' | 'UNDISCLOSED';
    education: 'NO_FORMAL_EDUCATION' | 'PRIMARY_EDUCATION' | 'SECONDARY_EDUCATION' | 'HIGH_SCHOOL' | 'DIPLOMA' | 'BACHELORS' | 'MASTERS' | 'DOCTORATE' | 'POST_DOCTORATE' | 'VOCATIONAL_TRAINING' | 'PROFESSIONAL_CERTIFICATION' | 'OTHER' | 'UNDISCLOSED';
    nationality: string;
    countryOfBirth: string;
    countryOfResidence: string;
};

