/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCountryDto } from '../models/CreateCountryDto';
import type { UpdateCountryDto } from '../models/UpdateCountryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CountryService {
    /**
     * @returns string
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreateCountryDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/country',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static findAll(searchParams?: {
        fieldName?: string;
        fieldValue?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: string;
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/country',
            query: searchParams,
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static findOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/country/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static update({
        oid,
        requestBody,
    }: {
        oid: string,
        requestBody: UpdateCountryDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/country/{oid}',
            path: {
                'oid': oid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static remove({
        id,
    }: {
        id: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/country/{id}',
            path: {
                'id': id,
            },
        });
    }
}