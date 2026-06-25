import { Request, Response } from "express";
import ApiError from "../utils/ApiError";

export const notFoundRouter = (req: Request, res: Response) => {
  throw ApiError.NotFound("PATH_NOT_FOUND");
};