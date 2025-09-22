/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBankAccountDto } from '../models/CreateBankAccountDto';
import type { UpdateBankAccountDto } from '../models/UpdateBankAccountDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BankAccountService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreateBankAccountDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/bank-account/add-bank-account',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
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
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bank-account/list-bank-accounts',
            query: {
                'fieldName': fieldName,
                'fieldValue': fieldValue,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static findOne({
        oid,
    }: {
        oid: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bank-account/account/{_oid}',
            path: {
                '_oid': oid,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static update({
        oid,
        requestBody,
    }: {
        oid: string,
        requestBody: UpdateBankAccountDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/bank-account/update/{_oid}',
            path: {
                '_oid': oid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static remove({
        oid,
    }: {
        oid: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/bank-account/delete/{_oid}',
            path: {
                '_oid': oid,
            },
        });
    }
}
