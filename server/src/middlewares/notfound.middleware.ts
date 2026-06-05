import { Request, Response } from "express";
import ApiError from "../shared/utils/ApiError";

export const notFoundRouter = (req: Request, res: Response) => {
  throw ApiError.NotFound({ customMessage: "المسار غير موجود" });
};