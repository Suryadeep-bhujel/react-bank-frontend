/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAddOnFeatureDto } from '../models/CreateAddOnFeatureDto';
import type { UpdateAddOnFeatureDto } from '../models/UpdateAddOnFeatureDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AddOnFeatureService {
    /**
     * @returns string
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreateAddOnFeatureDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/add-on-feature',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns string
     * @throws ApiError
     */
    public static findAll(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/add-on-feature',
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
            url: '/api/add-on-feature/{id}',
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
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateAddOnFeatureDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/add-on-feature/{id}',
            path: {
                'id': id,
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
            url: '/api/add-on-feature/{id}',
            path: {
                'id': id,
            },
        });
    }
}
