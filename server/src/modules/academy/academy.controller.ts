import { Response } from "express";
import { RequestAuth } from "../../shared/middlewares/auth.middleware";
import * as DTO from "./academy.dto";
import AcademyService from "./academy.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestAcademy } from "./academy.middleware";

const AcademyController = {
  createAcademy: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateAcademyDto;
    const academy = await AcademyService.create(dataSafe);

    return sendSuccess({
      res,
      statusCode: 201,
      data: academy,
      message: "تم إنشاء الأكاديمية بنجاح",
    });
  },

  updateAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateAcademyDto;
    const updatedAcademy = await AcademyService.update(dataSafe, req.academy);

    return sendSuccess({
      res,
      data: updatedAcademy,
      message: "تم تحديث الأكاديمية بنجاح",
    });
  },

  deleteAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteAcademyDto;
    await AcademyService.delete(dataSafe, req.academy);

    return sendSuccess({
      res,
      message: "تم حذف الأكاديمية بنجاح",
    });
  },

  getAllAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllAcademiesDto;
    const data = await AcademyService.getAll(dataSafe);

    return sendSuccess({ res, data });
  },

  getDetailsAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAcademyDetailsDto;
    const academy = await AcademyService.getDetails(dataSafe, req.academy);

    return sendSuccess({ res, data: academy });
  },

  addOwnerAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.AddOwnerDto;
    const data = await AcademyService.addOwner(dataSafe, req.academy);

    return sendSuccess({
      res,
      statusCode: 201,
      data,
      message: "تم إضافة المالك بنجاح",
    });
  },

  deleteOwnerAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteOwnerDto;
    const data = await AcademyService.deleteOwner(dataSafe, req.academy);

    return sendSuccess({
      res,
      data,
      message: "تم حذف المالك بنجاح",
    });
  },

  addSocialMediaAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.AddSocialMediaDto;
    const data = await AcademyService.addSocialMedia(dataSafe, req.academy);

    return sendSuccess({
      res,
      statusCode: 201,
      data,
      message: "تم إضافة المنصة بنجاح",
    });
  },

  deleteSocialMediaAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteSocialMediaDto;

    const data = await AcademyService.deleteSocialMedia(dataSafe, req.academy);

    return sendSuccess({
      res,
      data,
      message: "تم حذف المنصة بنجاح",
    });
  },

  getMyAcademics: async (req: RequestAuth, res: Response) => {
    const userId = req.userLogin!.id;
    const data = await AcademyService.myAcademics({ userId });

    return sendSuccess({
      res,
      data,
    });
  },
};

export default AcademyController;