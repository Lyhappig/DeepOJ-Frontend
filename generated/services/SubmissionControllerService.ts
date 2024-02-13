/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_SubmissionVO_ } from '../models/BaseResponse_Page_SubmissionVO_';
import type { SubmissionAddRequest } from '../models/SubmissionAddRequest';
import type { SubmissionQueryRequest } from '../models/SubmissionQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SubmissionControllerService {

    /**
     * doSubmit
     * @param submissionAddRequest submissionAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doSubmitUsingPost(
submissionAddRequest: SubmissionAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/submit/',
            body: submissionAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listSubmissionVOByPage
     * @param submissionQueryRequest submissionQueryRequest
     * @returns BaseResponse_Page_SubmissionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listSubmissionVoByPageUsingPost(
submissionQueryRequest: SubmissionQueryRequest,
): CancelablePromise<BaseResponse_Page_SubmissionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/submit/list/page/vo',
            body: submissionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
