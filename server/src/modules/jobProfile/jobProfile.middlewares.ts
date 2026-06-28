import { NextFunction, Response } from "express";
import ApiError from "../../shared/utils/ApiError";
import { prisma } from "../../lib/prisma";
import { JobProfileType } from "../../../prisma/generated/enums";
import { RequestJobProfile } from "./jobProfile.type";

const allowJobProfiles = (types: JobProfileType[]) => {
    return async (req: RequestJobProfile, res: Response, next: NextFunction) => {
        const academy = req.academy
        const userLogin = req.userLogin
        if (!academy) throw ApiError.NotFound("Academy")
        if (!userLogin) throw ApiError.NotFound("User")

        const isOwner = academy.owners.some((o) => o.id === userLogin.id);
        if (!isOwner) {
            const jobProfile = await prisma.jobProfile.findUnique({ where: { academyId_userId: { academyId: academy.id, userId: userLogin.id } }, include: { financialAccount: true } })
            if (!jobProfile) throw ApiError.NotFound("JobProfile")
            if (!types.includes(jobProfile.jobProfileType)) {
                throw ApiError.Forbidden()
            }
            if (!jobProfile.isActive) {
                throw ApiError.AccountBlocked("ملفك الوظيفي موقوف حاليًا. يُرجى التواصل مع الإدارة لإعادة تفعيل الملف الوظيفي.")
            }
            req.jobProfile = jobProfile
        }

        return next()
    }
}

export default allowJobProfiles