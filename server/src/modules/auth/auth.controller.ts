import { Response } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as DTO from "./auth.dto";
import AuthService from "./auth.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestValidation } from "../../middlewares/validation.middleware";
import { CreateUserDto } from "../user/user.dto";
import { cookieAccess, cookieRefresh } from "../../shared/utils/cookie";

const AuthController = {
  login: async (req: RequestValidation, res: Response) => {
    const dataSafe = req.dataSafe as DTO.LoginDto;

    const { tokens, user } = await AuthService.login(dataSafe);

    res.cookie("access", tokens.access, cookieAccess);

    res.cookie("refresh", tokens.refresh, cookieRefresh);

    return sendSuccess({
      res,
      data: user,
      message: "تم تسجيل الدخول بنجاح",
    });
  },

  refresh: async (req: RequestAuth, res: Response) => {
    const userLogin = req.userLogin!;
    const tokenPayload = req.tokenPayload!;

    const { access, user } = await AuthService.refresh({ userLogin, tokenPayload });

    res.cookie("access", access, cookieAccess);


    return sendSuccess({
      res,
      data: user,
      message: "تم تجديد صلاحية الدخول بنجاح",
    });
  },

  logout: async (req: RequestAuth, res: Response) => {
    const userLogin = req.userLogin!;
    const tokenPayload = req.tokenPayload!;
    const dataSafe = req.dataSafe as DTO.LogoutDto;

    await AuthService.logout({ userLogin, tokenPayload, dataSafe });

    res.clearCookie("access", cookieAccess);
    res.clearCookie("refresh", cookieRefresh);

    return sendSuccess({
      res,
      message: "تم تسجيل الخروج بنجاح",
    });
  },

  changePassword: async (req: RequestAuth, res: Response) => {
    const userLogin = req.userLogin!;
    const dataSafe = req.dataSafe as DTO.ChangePasswordDto;

    await AuthService.changePassword({ userLogin, dataSafe });

    res.clearCookie("access", cookieAccess);
    res.clearCookie("refresh", cookieRefresh);

    return sendSuccess({
      res,
      message: "تم تغيير كلمة المرور بنجاح",
    });
  },


  createFirstOwner: async (req: RequestValidation, res: Response) => {
    const dataSafe = req.dataSafe as CreateUserDto

    const user = await AuthService.createFirstOwner(dataSafe);

    return sendSuccess({
      res,
      statusCode: 201,
      data: user,
      message: "تم إنشاء المستخدم المالك بنجاح",
    });
  },
};

export default AuthController;