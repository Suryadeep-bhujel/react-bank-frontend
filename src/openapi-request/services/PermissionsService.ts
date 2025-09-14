/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResponseDto } from '../models/ListResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PermissionsService {
    /**
     * @returns ListResponseDto
     * @throws ApiError
     */
    public static findAll(): CancelablePromise<ListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/permission/list',
        });
    }
}
