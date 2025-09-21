/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommonListReponse } from '../models/CommonListReponse';
import type { CreateRoleDto } from '../models/CreateRoleDto';
import type { RoleDetailResponseDto } from '../models/RoleDetailResponseDto';
import type { UpdatePermissionOfRoleDto } from '../models/UpdatePermissionOfRoleDto';
import type { UpdateRoleDto } from '../models/UpdateRoleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RoleService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreateRoleDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/role',
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
            url: '/api/role/list',
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
    public static updatePermissionOfRole({
        oid,
        requestBody,
    }: {
        oid: string,
        requestBody: UpdatePermissionOfRoleDto,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/role/update-permission/{oid}',
            path: {
                'oid': oid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns RoleDetailResponseDto
     * @throws ApiError
     */
    public static findOne({
        oid,
    }: {
        oid: string,
    }): CancelablePromise<RoleDetailResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/role/{oid}',
            path: {
                'oid': oid,
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
        requestBody: UpdateRoleDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/role/{id}',
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
            url: '/api/role/{id}',
            path: {
                'id': id,
            },
        });
    }
}
