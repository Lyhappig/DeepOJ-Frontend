/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeInfo } from './JudgeInfo';
import type { ProblemVO } from './ProblemVO';
import type { UserVO } from './UserVO';

export type SubmissionVO = {
    code?: string;
    createTime?: string;
    id?: number;
    judgeInfo?: JudgeInfo;
    language?: string;
    problemVO?: ProblemVO;
    runMemory?: number;
    runTime?: number;
    status?: string;
    submissionId?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};
