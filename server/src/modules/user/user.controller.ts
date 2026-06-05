import { Response } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as DTO from "./user.dto";
import * as UserService from "./user.service";
import sendSuccess from "../../shared/utils/successResponse";

export const createUser = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.CreateUserDto;

  const user = await UserService.create(dataSafe);

  return sendSuccess({
    res,
    statusCode: 201,
    data: user,
    message: "تم إنشاء المستخدم بنجاح",
  });
};

export const updateUser = async (req: RequestAuth, res: Response) => {
  const currentUser = req.userLogin!;
  const dataSafe = req.dataSafe as DTO.UpdateUserDto;

  const updatedUser = await UserService.update(currentUser, dataSafe);

  return sendSuccess({
    res,
    data: updatedUser,
    message: "تم تحديث المستخدم بنجاح",
  });
};

export const deleteUser = async (req: RequestAuth, res: Response) => {
  const currentUser = req.userLogin!;
  const dataSafe = req.dataSafe as DTO.DeleteUserDto;

  await UserService.remove(currentUser, dataSafe);

  return sendSuccess({
    res,
    message: "تم حذف المستخدم نهائيًا",
  });
};

export const getAllUser = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetAllUsersDto;

  const data = await UserService.getAll(dataSafe);

  return sendSuccess({
    res,
    data,
  });
};

export const getDetailsUser = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetUserDetailsDto;

  const user = await UserService.getDetails(dataSafe);

  return sendSuccess({ res, data: user });
};
