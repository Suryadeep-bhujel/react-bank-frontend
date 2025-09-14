/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDto } from '../models/LoginDto';
import type { LoginResponseDto } from '../models/LoginResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Login user
     * @returns LoginResponseDto
     * @returns any
     * @throws ApiError
     */
    public static login({
        requestBody,
    }: {
        requestBody: LoginDto,
    }): CancelablePromise<LoginResponseDto | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns LoginResponseDto
     * @throws ApiError
     */
    public static currentUser(): CancelablePromise<LoginResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/current-user',
        });
    }
}
