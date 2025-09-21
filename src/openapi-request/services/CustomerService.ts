/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCustomerDto } from '../models/CreateCustomerDto';
import type { CreateCustomerResponseDto } from '../models/CreateCustomerResponseDto';
import type { UpdateCustomerDto } from '../models/UpdateCustomerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomerService {
    /**
     * @returns CreateCustomerResponseDto
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreateCustomerDto,
    }): CancelablePromise<CreateCustomerResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/customers/register-new-customer',
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
            url: '/api/customers/all-customers',
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
            url: '/api/customers/{_oid}',
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
        requestBody: UpdateCustomerDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/customers/{_oid}',
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
            url: '/api/customers/{_oid}',
            path: {
                '_oid': oid,
            },
        });
    }
}
