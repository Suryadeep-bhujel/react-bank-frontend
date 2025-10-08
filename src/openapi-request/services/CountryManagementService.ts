/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommonListReponse } from '../models/CommonListReponse';
import type { CountrySearchDto } from '../models/CountrySearchDto';
import type { CreateCountryDto } from '../models/CreateCountryDto';
import type { CreateUpdateResponseDto } from '../models/CreateUpdateResponseDto';
import type { UpdateCountryDto } from '../models/UpdateCountryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CountryManagementService {
    /**
     * @returns CreateUpdateResponseDto
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreateCountryDto,
    }): CancelablePromise<CreateUpdateResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/country/add-country',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CommonListReponse
     * @throws ApiError
     */
    public static findAll({
        fieldName,
        fieldValue,
        page,
        limit,
        sortBy,
        sortOrder,
    }: {
        fieldName?: string,
        fieldValue?: string,
        page?: number,
        limit?: number,
        sortBy?: string,
        sortOrder?: string,
    }): CancelablePromise<CommonListReponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/country/list',
            query: {
                'fieldName': fieldName,
                'fieldValue': fieldValue,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CommonListReponse
     * @throws ApiError
     */
    public static getCountryDropdown({
        requestBody,
    }: {
        requestBody: CountrySearchDto,
    }): CancelablePromise<CommonListReponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/country/country-dropdown',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CreateUpdateResponseDto
     * @throws ApiError
     */
    public static findOne({
        oid,
    }: {
        oid: string,
    }): CancelablePromise<CreateUpdateResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/country/detail/{_oid}',
            path: {
                '_oid': oid,
            },
        });
    }
    /**
     * @returns CreateUpdateResponseDto
     * @throws ApiError
     */
    public static update({
        oid,
        requestBody,
    }: {
        oid: string,
        requestBody: UpdateCountryDto,
    }): CancelablePromise<CreateUpdateResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/country/update/{_oid}',
            path: {
                '_oid': oid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
