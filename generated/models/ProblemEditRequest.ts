/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
import type { ProblemContent } from './ProblemContent';

export type ProblemEditRequest = {
    answer?: string;
    difficulty?: number;
    id?: number;
    judgeCases?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    problemContent?: ProblemContent;
    title?: string;
};
