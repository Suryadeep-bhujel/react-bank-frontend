/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommonListReponse } from '../models/CommonListReponse';
import type { CreateBranchManagerDto } from '../models/CreateBranchManagerDto';
import type { ManagerSearchDto } from '../models/ManagerSearchDto';
import type { UpdateBranchManagerDto } from '../models/UpdateBranchManagerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BranchManagerService {
    /**
     * @returns string
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreateBranchManagerDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/branch-manager/add-branch-manager',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CommonListReponse
     * @throws ApiError
     */
    public static findAll({
        requestBody,
        fieldName,
        fieldValue,
        page,
        limit,
        sortBy,
        sortOrder,
    }: {
        requestBody: ManagerSearchDto,
        fieldName?: string,
        fieldValue?: string,
        page?: number,
        limit?: number,
        sortBy?: string,
        sortOrder?: string,
    }): CancelablePromise<CommonListReponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/branch-manager',
            query: {
                'fieldName': fieldName,
                'fieldValue': fieldValue,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
            body: requestBody,
            mediaType: 'application/json',
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
            url: '/api/branch-manager/{id}',
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
        requestBody: UpdateBranchManagerDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/branch-manager/{id}',
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
            url: '/api/branch-manager/{id}',
            path: {
                'id': id,
            },
        });
    }
}
