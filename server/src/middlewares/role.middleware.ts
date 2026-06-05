import { NextFunction, RequestHandler, Response } from "express";
import ApiError from "../shared/utils/ApiError";
import { RequestAuth } from "./auth.middleware";
import { Role } from "../../prisma/generated/enums";

const checkRole = (roles: Role[]): RequestHandler => {
  return (req: RequestAuth, res: Response, next: NextFunction) => {
    const user = req.userLogin;

    if (!user) {
      throw ApiError.NotFound({ model: "User" });
    }

    const hasRole = roles.some((role) => user.roles.includes(role));

    if (!hasRole) {
      throw ApiError.Forbidden();
    }

    next();
  };
};

export default checkRole;
