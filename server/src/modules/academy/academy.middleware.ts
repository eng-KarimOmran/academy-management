import { RequestAcademy } from './academy.type';
import { Response, NextFunction } from "express";
import ApiError from "../../shared/utils/ApiError";
import { prisma } from '../../lib/prisma';

export const checkAcademyExists = ({ isAcademyOwner }: { isAcademyOwner?: boolean } = {}) => {
  return async (req: RequestAcademy, res: Response, next: NextFunction) => {
    const userId = req.userLogin?.id;
    if (!userId) throw ApiError.Unauthorized();

    const academyId = req.params?.academyId;
    if (!academyId || typeof academyId !== "string") {
      throw ApiError.ValidationError("معرف الأكاديمية مطلوب");
    }


    const academy = req.academy ?? await prisma.academy.findUnique({
      where: { id: academyId },
      include: {
        owners: true,
        financialAccount: true
      }
    })

    if (!academy) throw ApiError.NotFound("Academy");

    if (isAcademyOwner) {
      const isOwner = academy.owners.some((o) => o.id === userId);
      if (!isOwner) throw ApiError.Forbidden();
    }

    if (!academy.financialAccount) {
      throw ApiError.NotFound("financialAccount")
    }

    req.academy = academy;

    return next();
  }
};