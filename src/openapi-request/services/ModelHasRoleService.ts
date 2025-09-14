/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateModelHasRoleDto } from '../models/CreateModelHasRoleDto';
import type { UpdateModelHasRoleDto } from '../models/UpdateModelHasRoleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModelHasRoleService {
    /**
     * @returns string
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreateModelHasRoleDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/model-has-role',
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
            url: '/api/model-has-role',
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
            url: '/api/model-has-role/{id}',
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
        requestBody: UpdateModelHasRoleDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/model-has-role/{id}',
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
            url: '/api/model-has-role/{id}',
            path: {
                'id': id,
            },
        });
    }
}
