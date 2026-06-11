import { Response } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as DTO from "./academy.dto";
import { RequestAcademy } from "./academy.middleware";
import AcademyService from "./academy.service";
import sendSuccess from "../../shared/utils/successResponse";

const AcademyController = {
  createAcademy: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateAcademyDto;

    const academy = await AcademyService.create(dataSafe.body);

    return sendSuccess({
      res,
      statusCode: 201,
      data: academy,
      message: "تم إنشاء الأكاديمية بنجاح",
    });
  },

  updateAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateAcademyDto;
    const academy = req.academy!;

    const updatedAcademy = await AcademyService.update({
      ...dataSafe,
      academy
    });

    return sendSuccess({
      res,
      data: updatedAcademy,
      message: "تم تحديث الأكاديمية بنجاح",
    });
  },

  deleteAcademy: async (req: RequestAcademy, res: Response) => {
    const academy = req.academy!;

    await AcademyService.delete({ academy });

    return sendSuccess({
      res,
      message: "تم حذف الأكاديمية وتحديث أدوار المستخدمين بنجاح",
    });
  },

  getAllAcademy: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllAcademiesDto;

    const data = await AcademyService.getAll(dataSafe.query);

    return sendSuccess({ res, data });
  },

  getDetailsAcademy: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAcademyDetailsDto;
    const { academyId } = dataSafe.params;

    const academy = await AcademyService.getDetails({ academyId });

    return sendSuccess({ res, data: academy });
  },

  addOwnerAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.AddOwnerDto;
    const academy = req.academy!;

    const data = await AcademyService.addOwner({
      phone: dataSafe.body.phone,
      academy
    });

    return sendSuccess({
      res,
      statusCode: 201,
      data,
      message: "تم اضافة المالك بنجاح",
    });
  },

  deleteOwnerAcademy: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteOwnerDto;
    const academy = req.academy!;

    const data = await AcademyService.deleteOwner({
      userId: dataSafe.params.ownerId,
      academy
    });

    return sendSuccess({
      res,
      data,
      message: "تم حذف المالك بنجاح",
    });
  },

  addSocialMediaAcademy: async (req: RequestAcademy, res: Response) => {
    const { body } = req.dataSafe as DTO.AddSocialMediaDto;
    const academy = req.academy!;

    const data = await AcademyService.addSocialMedia({
      academy,
      ...body
    });

    return sendSuccess({
      res,
      statusCode: 201,
      data,
      message: "تم اضافة المنصة بنجاح",
    });
  },

  deleteSocialMediaAcademy: async (req: RequestAcademy, res: Response) => {
    const { params } = req.dataSafe as DTO.DeleteSocialMediaDto;
    const { platformId } = params;
    const academy = req.academy!;

    const data = await AcademyService.deleteSocialMedia({
      academy,
      platformId,
    });

    return sendSuccess({
      res,
      data,
      message: "تم حذف المنصة بنجاح",
    });
  },
};

export default AcademyController;