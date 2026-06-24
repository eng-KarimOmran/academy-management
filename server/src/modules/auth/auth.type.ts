import { User } from '../../../prisma/generated/client';
import { RequestValidation } from './../../shared/middlewares/validation.middleware';
import { JwtPayload } from "jsonwebtoken";

export enum TokenType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}

export interface ITokenPayload extends JwtPayload {
  id: string;
  exp: number
  jti: string
  sub: string
}

export interface VerifyTokenProps {
  token: string;
  type: TokenType;
}

export interface RequestAuth extends RequestValidation {
  tokenPayload?: ITokenPayload;
  userLogin?: User;
}

export interface IAuthService {
  login(data: {
    phone: string;
    password: string;
  }): Promise<{ access: string; refresh: string; userId: string }>;

  logout(data: { allDevices: boolean, exp: number, userId: string; jti: string }): Promise<boolean>;

  refresh(data: { userId: string, jti: string }): { access: string };

  changePassword(data: {
    userId: string;
    password: string;
    newPassword: string;
    currentPassword: string
  }): Promise<boolean>;

  createFirstUser(data: {
    name: string;
    phone: string;
  }): Promise<{
    id: string;
    phone: string;
  }>;
}