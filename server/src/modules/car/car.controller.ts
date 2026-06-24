import { Response } from "express";
import { RequestAuth } from "../../shared/middlewares/auth.middleware";
import * as DTO from "./car.dto";
import CarService from "./car.service";
import sendSuccess from "../../shared/utils/successResponse";

const CarController = {
  createCar: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateDto;

    const car = await CarService.create({ dataSafe });

    return sendSuccess({
      res,
      statusCode: 201,
      data: car,
      message: "تم إنشاء السيارة بنجاح",
    });
  },

  updateCar: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateDto;

    const carUpdate = await CarService.update({ dataSafe });

    return sendSuccess({
      res,
      data: carUpdate,
      message: "تم تحديث السيارة بنجاح",
    });
  },

  getAllCars: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllDto;

    const data = await CarService.getAll({ dataSafe });

    return sendSuccess({ res, data });
  },

  getDetailsCar: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDetailsDto;

    const car = await CarService.getDetails({ dataSafe });

    return sendSuccess({ res, data: car });
  },

  deleteCar: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteDto;

    await CarService.delete({ dataSafe });

    return sendSuccess({
      res,
      message: "تم حذف السيارة بنجاح",
    });
  },
};

export default CarController;