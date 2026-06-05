import { NextFunction, RequestHandler, Response } from "express";
import { ITokenPayload, Token, TokenType } from "../shared/utils/Token";
import ApiError from "../shared/utils/ApiError";
import { User } from "../../prisma/generated/client";
import dayjs from "dayjs";
import { RequestValidation } from "./validation.middleware";
import { isBlacklisted } from "../modules/auth/auth.repository";
import { findUserById } from "../modules/user/user.repository";
import { userAuthSelect } from "../modules/user/user.selectors";

export interface RequestAuth extends RequestValidation {
  tokenPayload?: ITokenPayload;
  userLogin?: User;
}

const auth = (type: TokenType = TokenType.ACCESS): RequestHandler => {
  return async (req: RequestAuth, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (type === TokenType.ACCESS) {
      token = req.cookies.access;
    } else if (type === TokenType.REFRESH) {
      token = req.cookies.refresh;
    }

    const tokenPayload = Token.verifyToken({ token, type });

    const user = await findUserById({
      id: tokenPayload.id,
      select: userAuthSelect,
    });

    if (!user) {
      throw ApiError.NotFound({ model: "User" });
    }

    const isTokenBanned = await isBlacklisted(tokenPayload.jti!);

    if (isTokenBanned) {
      throw ApiError.Unauthorized("تم إنهاء هذه الجلسة");
    }

    const logoutTime = user.logoutAt ? dayjs(user.logoutAt).unix() : 0;

    if (tokenPayload.iat && tokenPayload.iat < logoutTime) {
      throw ApiError.Unauthorized("تم إنهاء هذه الجلسة");
    }

    if (!user.isActive) {
      throw ApiError.AccountBlocked();
    }

    req.tokenPayload = tokenPayload;
    req.userLogin = user;

    next();
  };
};

export default auth;
