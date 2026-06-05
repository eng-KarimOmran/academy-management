import { Response } from "express";
import * as DTO from "./car.dto";
import * as CarService from "./car.service";
import { RequestAuth } from "../../middlewares/auth.middleware";

import sendSuccess from "../../shared/utils/successResponse";



export const createCar = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.CreateDto;

  const car = await CarService.create(dataSafe);

  return sendSuccess({
    res,
    statusCode: 201,
    data: car,
    message: "تم إنشاء السيارة بنجاح",
  });
};

export const updateCar = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.UpdateDto;

  const carUpdate = await CarService.update(dataSafe);

  return sendSuccess({
    res,
    data: carUpdate,
    message: "تم تحديث السيارة بنجاح",
  });
};

export const getAllCars = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetAllDto;

  const data = await CarService.getAll(dataSafe);

  return sendSuccess({ res, data });
};

export const getDetailsCar = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetDetailsDto;

  const car = await CarService.getDetails(dataSafe);

  return sendSuccess({ res, data: car });
};

export const deleteCar = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.DeleteDto;

  await CarService.remove(dataSafe);

  return sendSuccess({
    res,
    message: "تم حذف السيارة بنجاح",
  });
};