/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
import type { ProblemContent } from './ProblemContent';
import type { UserVO } from './UserVO';

export type ProblemVO = {
    acceptedNum?: number;
    answer?: string;
    contestId?: number;
    createTime?: string;
    difficulty?: number;
    favourNum?: number;
    id?: number;
    judgeCases?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    problemContent?: ProblemContent;
    submitNum?: number;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};
