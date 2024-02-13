/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
import type { ProblemContent } from './ProblemContent';

export type ProblemAddRequest = {
    answer?: string;
    difficulty?: number;
    judgeCases?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    problemContent?: ProblemContent;
    title?: string;
};
