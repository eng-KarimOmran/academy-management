import { AcademyWithFullRelations } from './academy.type';
import { Response, NextFunction } from "express";
import { RequestAuth } from "../../shared/middlewares/auth.middleware";
import ApiError from "../../shared/utils/ApiError";
import AcademyRepository from './academy.repository';

export interface RequestAcademy extends RequestAuth {
  academy?: AcademyWithFullRelations;
}

export const checkAcademyExists = ({ isAcademyOwner = false }: { isAcademyOwner?: boolean } = {}) => {
  return async (req: RequestAcademy, res: Response, next: NextFunction) => {
    const userId = req.userLogin?.id
    if (!userId) throw ApiError.Unauthorized()
    const academyId = req.params?.academyId

    if (!academyId || typeof academyId !== "string") throw ApiError.ValidationError("معرف الأكادمية مطلوب")

    const academy = req.academy ?? await AcademyRepository.getAcademyDetails(academyId)

    if (!academy) throw ApiError.NotFound("Academy");

    if (isAcademyOwner) {
      const isOwner = academy.owners.some((o) => o.id === userId);
      if (!isOwner) throw ApiError.Forbidden();
    }

    req.academy = academy

    next();
  }
};