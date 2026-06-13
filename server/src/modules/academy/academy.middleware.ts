import { Response, NextFunction } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import AcademyRepository from "./academy.repository";
import ApiError from "../../shared/utils/ApiError";
import { Academy } from "../../../prisma/generated/client";
import { academyWithOwnersSelect } from "./academy.selector";

export type AcademyWithOwners = Academy & { owners: { id: string }[] };

export interface RequestAcademy extends RequestAuth {
  academy?: AcademyWithOwners;
}

export const checkAcademyExists = async (
  req: RequestAcademy,
  res: Response,
  next: NextFunction,
) => {
  const academyId = req.params.academyId as string;

  const academy = await AcademyRepository.findById({ academyId, select: academyWithOwnersSelect });
  if (!academy) throw ApiError.NotFound({ model: "Academy" });

  req.academy = academy;
  next();
};

export const isAcademyOwnerMiddleware = async (
  req: RequestAcademy,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userLogin?.id;
  const academyId = req.academy?.id

  if (!userId || !academyId) throw ApiError.ValidationError();

  const academy = await AcademyRepository.findById({
    academyId,
    select: academyWithOwnersSelect
  });

  if (!academy) throw ApiError.NotFound({ model: "Academy" });

  const isAcademyOwner = academy.owners.some((o) => o.id === userId);
  if (!isAcademyOwner) throw ApiError.Forbidden();

  req.academy = academy as AcademyWithOwners;
  next();
};