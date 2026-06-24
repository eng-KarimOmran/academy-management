import { Response } from "express";
import { RequestAuth } from "../../shared/middlewares/auth.middleware";
import * as DTO from "./user.dto";
import UserService from "./user.service";
import sendSuccess from "../../shared/utils/successResponse";

const UserController = {
  createUser: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateUserDto;

    const user = await UserService.create({ dataSafe });

    return sendSuccess({
      res,
      statusCode: 201,
      data: user,
      message: "تم إنشاء المستخدم بنجاح",
    });
  },

  updateUser: async (req: RequestAuth, res: Response) => {
    const currentUser = req.userLogin!;
    const dataSafe = req.dataSafe as DTO.UpdateUserDto;

    const updatedUser = await UserService.update({ currentUser, dataSafe });

    return sendSuccess({
      res,
      data: updatedUser,
      message: "تم تحديث المستخدم بنجاح",
    });
  },

  deleteUser: async (req: RequestAuth, res: Response) => {
    const currentUser = req.userLogin!;
    const dataSafe = req.dataSafe as DTO.DeleteUserDto;

    await UserService.delete({ currentUser, dataSafe });

    return sendSuccess({
      res,
      message: "تم حذف المستخدم نهائيًا",
    });
  },

  getAllUser: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllUsersDto;

    const data = await UserService.getAll({ dataSafe });

    return sendSuccess({
      res,
      data,
    });
  },

  getDetailsUser: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetUserDetailsDto;

    const user = await UserService.getDetails({ dataSafe });

    return sendSuccess({ res, data: user });
  },
};

export default UserController;