import { Response } from "express";
import { RequestAuth } from "../../shared/middlewares/auth.middleware";
import * as DTO from "./captain.dto";
import CaptainService from "./captain.service";
import sendSuccess from "../../shared/utils/successResponse";

const CaptainController = {
  createCaptain: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateDto;

    const captain = await CaptainService.create({dataSafe});

    return sendSuccess({
      res,
      statusCode: 201,
      data: captain,
      message: "تم إنشاء ملف الكابتن بنجاح",
    });
  },

  updateCaptain: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateDto;

    const captain = await CaptainService.update({dataSafe});

    return sendSuccess({
      res,
      data: captain,
      message: "تم تحديث الكابتن بنجاح",
    });
  },

  getAllCaptains: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllDto;

    const data = await CaptainService.getAll({dataSafe});

    return sendSuccess({
      res,
      data,
    });
  },

  getDetailsCaptain: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDetailsDto;

    const captain = await CaptainService.getDetails({dataSafe});

    return sendSuccess({
      res,
      data: captain,
    });
  },

  deleteCaptain: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteDto;

    await CaptainService.delete({dataSafe});

    return sendSuccess({
      res,
      message: "تم حذف الملف الشخصي للكابتن نهائيًا",
    });
  },
};

export default CaptainController;