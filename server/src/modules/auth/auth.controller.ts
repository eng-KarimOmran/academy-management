import { Response } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import { RequestValidation } from "../../middlewares/validation.middleware";
import * as DTO from "./auth.dto";
import { cookieAccess, cookieRefresh } from "../../shared/utils/cookie";
import * as AuthService from "./auth.service";
import sendSuccess from "../../shared/utils/successResponse";

export const login = async (req: RequestValidation, res: Response) => {
  const dataSafe = req.dataSafe as DTO.LoginDto;
  const { user, tokens } = await AuthService.login(dataSafe);

  res.cookie("access", tokens.access, cookieAccess);
  res.cookie("refresh", tokens.refresh, cookieRefresh);

  return sendSuccess({
    res,
    message: "تم تسجيل الدخول بنجاح",
    data: user,
  });
};

export const refresh = async (req: RequestAuth, res: Response) => {
  const userLogin = req.userLogin!;
  const tokenPayload = req.tokenPayload!;

  const { access, user } = await AuthService.refresh({
    userLogin,
    tokenPayload,
  });

  res.cookie("access", access, cookieAccess);

  return sendSuccess({
    res,
    message: "تم تحديث التوكن بنجاح",
    data: user,
  });
};

export const logout = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.LogoutDto;
  const userLogin = req.userLogin!;
  const tokenPayload = req.tokenPayload!;

  await AuthService.logout({ userLogin, tokenPayload, dataSafe });

  res.clearCookie("refresh", cookieRefresh);
  res.clearCookie("access", cookieAccess);

  return sendSuccess({
    res,
    message: "تم تسجيل الخروج بنجاح",
    data: null,
  });
};

export const changePassword = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.ChangePasswordDto;
  const userLogin = req.userLogin!;

  await AuthService.changePassword({ userLogin, dataSafe });

  res.clearCookie("refresh", cookieRefresh);
  res.clearCookie("access", cookieAccess);

  return sendSuccess({
    res,
    message: "تم تغيير كلمة المرور بنجاح. يرجى تسجيل الدخول مرة أخرى.",
    data: null,
  });
};
