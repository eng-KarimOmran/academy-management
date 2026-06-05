import { Response } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as DTO from "./captain.dto";
import sendSuccess from "../../shared/utils/successResponse";
import * as CaptainService from "./captain.service";

export const createCaptain = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.CreateDto;

  const captain = await CaptainService.create(dataSafe);

  return sendSuccess({
    res,
    statusCode: 201,
    data: captain,
    message: "تم إنشاء ملف الكابتن بنجاح",
  });
};

export const updateCaptain = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.UpdateDto;

  const captain = await CaptainService.update(dataSafe);

  return sendSuccess({
    res,
    data: captain,
    message: "تم تحديث الكابتن بنجاح",
  });
};

export const getAllCaptains = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetAllDto;

  const data = await CaptainService.getAll(dataSafe);

  return sendSuccess({
    res,
    data,
  });
};

export const getDetailsCaptain = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetDetailsDto;

  const captain = await CaptainService.getDetails(dataSafe);

  return sendSuccess({
    res,
    data: captain,
  });
};

export const deleteCaptain = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.DeleteDto;

  await CaptainService.remove(dataSafe);

  return sendSuccess({
    res,
    message: "تم حذف الملف الشخصي للكابتن نهائيًا",
  });
};