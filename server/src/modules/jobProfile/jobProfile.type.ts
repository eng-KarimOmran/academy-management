import { JobProfile, User } from "../../../prisma/generated/browser";
import { PaginatedResponse } from "../../shared/types/types";
import { RequestAcademy } from "../academy/academy.type";

import {
    CreateJobProfileDto,
    UpdateJobProfileDto,
    DeleteJobProfileDto,
    GetAllJobProfilesDto,
    GetJobProfileDetailsDto,
} from "./jobProfile.dto";

import { NextFunction, Response } from "express";

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

export type JobProfileControllerMethod = (
    req: RequestAcademy,
    res: Response,
    next: NextFunction
) => Promise<Response>

export interface IJobProfileController {
    createJobProfile: JobProfileControllerMethod;

    updateJobProfile: JobProfileControllerMethod;

    deleteJobProfile: JobProfileControllerMethod;

    getAllJobProfiles: JobProfileControllerMethod;

    getJobProfileDetails: JobProfileControllerMethod;
}