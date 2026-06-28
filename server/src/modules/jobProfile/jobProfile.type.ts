import { NextFunction, Response } from "express";
import { JobProfile } from "../../../prisma/generated/browser";
import { JobProfileGetPayload } from "../../../prisma/generated/models";
import { PaginatedResponse } from "../../shared/types/types";
import { AcademyRequestHandler, RequestAcademy } from "../academy/academy.type";

import {
    CreateJobProfileDto,
    UpdateJobProfileDto,
    DeleteJobProfileDto,
    GetAllJobProfilesDto,
    GetJobProfileDetailsDto,
} from "./jobProfile.dto";

export interface IJobProfileService {
    createJobProfile(
        data: CreateJobProfileDto
    ): Promise<JobProfile>;

    updateJobProfile(
        data: UpdateJobProfileDto,
    ): Promise<JobProfile>;

    deleteJobProfile(
        data: DeleteJobProfileDto
    ): Promise<JobProfile>;

    getAllJobProfiles(
        data: GetAllJobProfilesDto
    ): Promise<PaginatedResponse<JobProfile>>;

    getJobProfileDetails(
        data: GetJobProfileDetailsDto
    ): Promise<JobProfile>;
}


export interface IJobProfileController {
    createJobProfile: AcademyRequestHandler;

    updateJobProfile: AcademyRequestHandler;

    deleteJobProfile: AcademyRequestHandler;

    getAllJobProfiles: AcademyRequestHandler;

    getJobProfileDetails: AcademyRequestHandler;
}

export interface RequestJobProfile extends RequestAcademy {
    jobProfile?: JobProfileGetPayload<{ include: { financialAccount: true } }>
}

export type JobProfileRequestHandler = (
    req: RequestJobProfile,
    res: Response,
    next: NextFunction
) => Promise<Response>