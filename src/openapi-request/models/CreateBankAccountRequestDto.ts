/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountInfoRequestDto } from './AccountInfoRequestDto';
import type { AddOnInfoRequestDto } from './AddOnInfoRequestDto';
import type { AddressInfoRequestDto } from './AddressInfoRequestDto';
import type { ContactInfoRequestDto } from './ContactInfoRequestDto';
import type { KycInfoRequestDto } from './KycInfoRequestDto';
import type { PersonalInfoRequestDto } from './PersonalInfoRequestDto';
export type CreateBankAccountRequestDto = {
    accountInfo: AccountInfoRequestDto;
    personalInfo: PersonalInfoRequestDto;
    permanentAddressInfo: AddressInfoRequestDto;
    residentialAddressInfo: AddressInfoRequestDto;
    correspondingAddressInfo: AddressInfoRequestDto;
    contactInfo: ContactInfoRequestDto;
    kycInfo: KycInfoRequestDto;
    addOnInfo: AddOnInfoRequestDto;
};

