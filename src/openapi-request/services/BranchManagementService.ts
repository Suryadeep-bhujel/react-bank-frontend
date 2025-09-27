/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommonListReponse } from '../models/CommonListReponse';
import type { CreateBranchDto } from '../models/CreateBranchDto';
import type { UpdateBranchDto } from '../models/UpdateBranchDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BranchManagementService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreateBranchDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/branch/add-branch',
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
            url: '/api/branch/all-branches',
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
     * @returns CommonListReponse
     * @throws ApiError
     */
    public static branchDropdown({
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
            url: '/api/branch/branch-dropdown',
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
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/branch/{_oid}',
            path: {
                '_oid': oid,
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
        requestBody: UpdateBranchDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/branch/{_oid}',
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
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/branch/{_oid}',
            path: {
                '_oid': oid,
            },
        });
    }
}
