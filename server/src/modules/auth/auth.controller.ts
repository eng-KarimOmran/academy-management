import { Response } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as DTO from "./auth.dto";
import AuthService from "./auth.service";
import sendSuccess from "../../shared/utils/successResponse";

const AuthController = {
  login: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.LoginDto;

    const data = await AuthService.login(dataSafe);

    return sendSuccess({
      res,
      data,
      message: "تم تسجيل الدخول بنجاح",
    });
  },

  refresh: async (req: RequestAuth, res: Response) => {
    const userLogin = req.userLogin!;
    const tokenPayload = req.tokenPayload!;

    const data = await AuthService.refresh({ userLogin, tokenPayload });

    return sendSuccess({
      res,
      data,
      message: "تم تجديد صلاحية الدخول بنجاح",
    });
  },

  logout: async (req: RequestAuth, res: Response) => {
    const userLogin = req.userLogin!;
    const tokenPayload = req.tokenPayload!;
    const dataSafe = req.dataSafe as DTO.LogoutDto;

    await AuthService.logout({ userLogin, tokenPayload, dataSafe });

    return sendSuccess({
      res,
      message: "تم تسجيل الخروج بنجاح",
    });
  },

  changePassword: async (req: RequestAuth, res: Response) => {
    const userLogin = req.userLogin!;
    const dataSafe = req.dataSafe as DTO.ChangePasswordDto;

    await AuthService.changePassword({ userLogin, dataSafe });

    return sendSuccess({
      res,
      message: "تم تغيير كلمة المرور بنجاح",
    });
  },
};

export default AuthController;