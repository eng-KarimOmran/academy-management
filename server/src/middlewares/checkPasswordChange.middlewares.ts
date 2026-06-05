import { NextFunction, RequestHandler, Response } from "express";
import { RequestAuth } from "./auth.middleware";
import ApiError from "../shared/utils/ApiError";

export const checkPasswordChange: RequestHandler = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction,
) => {
  const user = req.userLogin!;
  if (!user.isPasswordChanged) {
    throw ApiError.BadRequest(
      "يجب عليك تغيير كلمة المرور الافتراضية أولاً قبل استخدام النظام",
    );
  }
  next();
};
