import { Response } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as DTO from "./area.dto";
import AreaService from "./area.service";
import sendSuccess from "../../shared/utils/successResponse";

const AreaController = {
  createArea: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateDto;

    const area = await AreaService.create(dataSafe.body);

    return sendSuccess({
      res,
      statusCode: 201,
      data: area,
      message: "تم إنشاء المنطقة بنجاح",
    });
  },

  updateArea: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateDto;
    const { areaId } = dataSafe.params;

    const updatedArea = await AreaService.update({
      areaId,
      ...dataSafe.body,
    });

    return sendSuccess({
      res,
      data: updatedArea,
      message: "تم تحديث المنطقة بنجاح",
    });
  },

  deleteArea: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteDto;
    const { areaId } = dataSafe.params;

    await AreaService.delete({ areaId });

    return sendSuccess({
      res,
      message: "تم حذف المنطقة بنجاح",
    });
  },

  getAllAreas: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllDto;

    const data = await AreaService.getAll(dataSafe.query);

    return sendSuccess({ res, data });
  },

  getDetailsArea: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDetailsDto;
    const { areaId } = dataSafe.params;

    const area = await AreaService.getDetails({ areaId });

    return sendSuccess({ res, data: area });
  },
};

export default AreaController;