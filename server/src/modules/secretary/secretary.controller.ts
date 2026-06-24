import { Response } from "express";
import { RequestAuth } from "../../shared/middlewares/auth.middleware";
import * as DTO from "./secretary.dto";
import SecretaryService from "./secretary.service";
import sendSuccess from "../../shared/utils/successResponse";

const SecretaryController = {
  createSecretary: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateDto;

    const secretary = await SecretaryService.create({dataSafe});

    return sendSuccess({
      res,
      statusCode: 201,
      data: secretary,
      message: "تم إنشاء ملف السكرتير بنجاح",
    });
  },

  updateSecretary: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateDto;

    const secretaryUpdate = await SecretaryService.update({dataSafe});

    return sendSuccess({
      res,
      data: secretaryUpdate,
      message: "تم تحديث ملف السكرتير بنجاح",
    });
  },

  getAllSecretary: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllDto;

    const data = await SecretaryService.getAll({dataSafe});

    return sendSuccess({ res, data });
  },

  getDetailsSecretary: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDetailsDto;

    const secretary = await SecretaryService.getDetails({dataSafe});

    return sendSuccess({ res, data: secretary });
  },

  deleteSecretary: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteDto;

    await SecretaryService.delete({dataSafe});

    return sendSuccess({
      res,
      message: "تم حذف الملف الشخصي للسكرتير نهائيًا",
    });
  },
};

export default SecretaryController;