import { nanoid } from "nanoid";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../../config/env";
import ApiError from "./ApiError";

export enum TokenType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}

export interface ITokenPayload extends JwtPayload {
  id: string;
}

interface VerifyTokenProps {
  token?: string;
  type: TokenType;
}

export class Token {
  static generateTokens(userId: string) {
    const {
      ACCESS_EXPIRATION,
      ACCESS_SECRET,
      REFRESH_EXPIRATION,
      REFRESH_SECRET,
    } = env.token;
    const jti = nanoid();

    const access = jwt.sign({ id: userId }, ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRATION,
      jwtid: jti,
    });

    const refresh = jwt.sign({ id: userId }, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRATION,
      jwtid: jti,
    });
    return { access, refresh };
  }

  static verifyToken({ type, token }: VerifyTokenProps) {
    const { ACCESS_SECRET, REFRESH_SECRET } = env.token;

    const secret = type === "ACCESS" ? ACCESS_SECRET : REFRESH_SECRET;

    if (!token) {
      throw ApiError.Unauthorized("الرجاء تسجيل الدخول أولاً");
    }

    try {
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw ApiError.Unauthorized(
          "انتهت صلاحية الجلسة، قم بتسجيل الدخول مرة أخرى",
        );
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw ApiError.Unauthorized("التوكن غير صالح");
      }

      if (error instanceof jwt.NotBeforeError) {
        throw ApiError.Unauthorized("التوكن غير مفعل بعد");
      }

      throw ApiError.Internal("حدث خطأ أثناء التحقق من التوكن");
    }
  }

  static generateAccessToken(userId: string, jti: string) {
    const { ACCESS_SECRET, ACCESS_EXPIRATION } = env.token;
    const access = jwt.sign({ id: userId }, ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRATION,
      jwtid: jti,
    });
    return access;
  }
}
