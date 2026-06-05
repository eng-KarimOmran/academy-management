import { Response } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as AcademyService from "./academy.service";
import * as DTO from "./academy.dto";
import sendSuccess from "../../shared/utils/SuccessResponse";
import { RequestAcademy } from "./academy.middleware";

export const createAcademy = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.CreateAcademyDto;

  const academy = await AcademyService.create(dataSafe);

  return sendSuccess({
    res,
    statusCode: 201,
    data: academy,
    message: "تم إنشاء الأكاديمية بنجاح",
  });
};

export const updateAcademy = async (req: RequestAcademy, res: Response) => {
  const dataSafe = req.dataSafe as DTO.UpdateAcademyDto;
  const academy = req.academy!;

  const updatedAcademy = await AcademyService.update(dataSafe, academy);

  return sendSuccess({
    res,
    data: updatedAcademy,
    message: "تم تحديث الأكاديمية بنجاح",
  });
};

export const deleteAcademy = async (req: RequestAcademy, res: Response) => {
  const academy = req.academy!;

  await AcademyService.remove(academy);

  return sendSuccess({
    res,
    message: "تم حذف الأكاديمية وتحديث أدوار المستخدمين بنجاح",
  });
};

export const getAllAcademy = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetAllAcademiesDto;

  const data = await AcademyService.getAll(dataSafe);

  return sendSuccess({ res, data });
};

export const getDetailsAcademy = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetAcademyDetailsDto;

  const academy = await AcademyService.getDetails(dataSafe);

  return sendSuccess({ res, data: academy });
};

export const addOwnerAcademy = async (req: RequestAcademy, res: Response) => {
  const dataSafe = req.dataSafe as DTO.AddOwnerDto;
  const academy = req.academy!;

  const data = await AcademyService.addOwner({
    academy,
    phone: dataSafe.body.phone,
  });

  return sendSuccess({
    res,
    statusCode: 201,
    data: data,
    message: "تم اضافة المالك بنجاح",
  });
};

export const deleteOwnerAcademy = async (
  req: RequestAcademy,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.DeleteOwnerDto;
  const academy = req.academy!;

  const data = await AcademyService.deleteOwner({
    academy,
    userId: dataSafe.params.ownerId,
  });

  return sendSuccess({
    res,
    data: data,
    message: "تم حذف المالك بنجاح",
  });
};

export const addSocialMediaAcademy = async (
  req: RequestAcademy,
  res: Response,
) => {
  const { body } = req.dataSafe as DTO.AddSocialMediaDto;
  const { url, platform } = body;
  const academy = req.academy!;

  const data = await AcademyService.addSocialMedia({
    academy,
    platform,
    url,
  });

  return sendSuccess({
    res,
    statusCode: 201,
    data: data,
    message: "تم اضافة المنصة بنجاح",
  });
};

export const deleteSocialMediaAcademy = async (
  req: RequestAcademy,
  res: Response,
) => {
  const { params } = req.dataSafe as DTO.DeleteSocialMediaDto;
  const { platformId } = params;
  const academy = req.academy!;

  const data = await AcademyService.deleteSocialMedia({
    academy,
    platformId,
  });

  return sendSuccess({
    res,
    data: data,
    message: "تم حذف المنصة بنجاح",
  });
};
