import { Response, NextFunction } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import { findAcademyById, findAcademyByOwner } from "./academy.repository";
import ApiError from "../../shared/utils/ApiError";
import { Academy } from "../../../prisma/generated/client";

export interface RequestAcademy extends RequestAuth {
  academy?: Academy;
}

export const isAcademyOwnerMiddleware = async (
  req: RequestAcademy,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.userLogin!;
  const academyId = req.params.academyId as string;

  const academy = await findAcademyByOwner({ academyId, ownerId: id });

  if (!academy) {
    throw ApiError.Forbidden();
  }

  req.academy = academy;

  next();
};

export const checkAcademyExists = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction,
) => {
  const academyId = req.params.academyId as string;
  const academy = await findAcademyById(academyId);
  if (!academy) throw ApiError.NotFound({ model: "Academy" });
  next();
};
