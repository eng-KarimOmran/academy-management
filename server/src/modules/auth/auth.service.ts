import { User } from "../../../prisma/generated/client";
import ApiError from "../../shared/utils/ApiError";
import HashHelper from "../../shared/utils/HashHelper";
import { omit } from "../../shared/utils/omit";
import { ITokenPayload, Token } from "../../shared/utils/Token";
import * as DTO from "./auth.dto";
import { findUserByPhone } from "../user/user.repository";
import * as repository from "./auth.repository";
import { userAuthSelect } from "../user/user.selectors";

type LoginParams = DTO.LoginDto;

type RefreshParams = {
  userLogin: User;
  tokenPayload: ITokenPayload;
};

type LogoutParams = {
  userLogin: User;
  tokenPayload: ITokenPayload;
  dataSafe: DTO.LogoutDto;
};

type ChangePasswordParams = {
  userLogin: User;
  dataSafe: DTO.ChangePasswordDto;
};

export const login = async (dataSafe: LoginParams) => {
  const { body } = dataSafe;
  const { phone, password } = body;

  const user = await findUserByPhone({ phone, select: userAuthSelect });

  if (!user || !user.isActive) {
    throw ApiError.Unauthorized("رقم الهاتف أو كلمة المرور غير صحيحة");
  }

  const isPasswordValid = await HashHelper.compare(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.Unauthorized("رقم الهاتف أو كلمة المرور غير صحيحة");
  }

  const { access, refresh } = Token.generateTokens(user.id);

  const safeUser = omit(user, ["password", "logoutAt"]);

  return {
    user: safeUser,
    tokens: { access, refresh },
  };
};

export const refresh = async ({ userLogin, tokenPayload }: RefreshParams) => {
  const access = Token.generateAccessToken(userLogin.id, tokenPayload.jti!);

  const safeUser = omit(userLogin, ["password", "logoutAt"]);

  return { access, user: safeUser };
};

export const logout = async ({
  userLogin,
  tokenPayload,
  dataSafe,
}: LogoutParams) => {
  const { allDevices } = dataSafe.query;

  if (allDevices) {
    await repository.logoutAllDevices(userLogin.id);
    return true;
  }

  await repository.addTokenBlacklist(tokenPayload.jti!);
  return true;
};

export const changePassword = async ({
  userLogin,
  dataSafe,
}: ChangePasswordParams) => {
  const { password } = dataSafe.body;

  const hashPassword = await HashHelper.hash(password);

  await repository.changePasswordUser({
    id: userLogin.id,
    hashPassword,
  });

  return true;
};
