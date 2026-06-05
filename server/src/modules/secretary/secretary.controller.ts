import { Response } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import sendSuccess from "../../shared/utils/successResponse";
import * as DTO from "./secretary.dto";
import * as SecretaryService from "./secretary.service";

export const createSecretary = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.CreateDto;

  const secretary = await SecretaryService.create(dataSafe);

  return sendSuccess({
    res,
    statusCode: 201,
    data: secretary,
    message: "تم إنشاء ملف السكرتير بنجاح",
  });
};

export const updateSecretary = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.UpdateDto;

  const secretaryUpdate = await SecretaryService.update(dataSafe);

  return sendSuccess({
    res,
    data: secretaryUpdate,
    message: "تم تحديث ملف السكرتير بنجاح",
  });
};

export const getAllSecretary = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetAllDto;

  const data = await SecretaryService.getAll(dataSafe);

  return sendSuccess({ res, data });
};

export const getDetailsSecretary = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetDetailsDto;

  const secretary = await SecretaryService.getDetails(dataSafe);

  return sendSuccess({ res, data: secretary });
};

export const deleteSecretary = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.DeleteDto;

  await SecretaryService.remove(dataSafe);

  return sendSuccess({
    res,
    message: "تم حذف الملف الشخصي للسكرتير نهائيًا",
  });
};
