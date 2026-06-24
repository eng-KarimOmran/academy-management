import { Response } from "express";
import * as DTO from "./area.dto";
import AreaService from "./area.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestAcademy } from "../academy/academy.middleware";

const AreaController = {
  createArea: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateAreaDto;
    const area = await AreaService.create(dataSafe);

    return sendSuccess({
      res,
      statusCode: 201,
      data: area,
      message: "تم إنشاء المنطقة بنجاح",
    });
  },

  updateArea: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateAreaDto;
    const updatedArea = await AreaService.update(dataSafe);

    return sendSuccess({
      res,
      data: updatedArea,
      message: "تم تحديث المنطقة بنجاح",
    });
  },

  deleteArea: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteAreaDto;
    await AreaService.delete(dataSafe);

    return sendSuccess({
      res,
      message: "تم حذف المنطقة بنجاح",
    });
  },

  getAllAreas: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllAreasDto;
    const data = await AreaService.getAll(dataSafe);

    return sendSuccess({ res, data });
  },

  getDetailsArea: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAreaDto;
    const area = await AreaService.getDetails(dataSafe);

    return sendSuccess({ res, data: area });
  },
};

export default AreaController;