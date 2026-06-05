import * as DTO from "./car.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPaginationParams } from "../../shared/utils/Pagination";
import {
  createCar,
  deleteCar,
  findCarById,
  findCarByPlateNumber,
  findManyCars,
  updateCar,
} from "./car.repository";
import { CarUpdateInput } from "../../../prisma/generated/models";
import { buildCarWhere } from "./cat.utils";

export const create = async (dataSafe: DTO.CreateDto) => {
  const { body } = dataSafe;
  const { plateNumber, ...otherData } = body;

  const carExists = await findCarByPlateNumber(plateNumber);
  if (carExists) throw ApiError.Conflict("PlateNumber");

  return await createCar({ plateNumber, ...otherData });
};

export const update = async (dataSafe: DTO.UpdateDto) => {
  const { body, params } = dataSafe;
  const { carId } = params;
  const { plateNumber, ...otherData } = body;

  const data: CarUpdateInput = { ...otherData };

  const car = await findCarById(carId);

  if (!car) {
    throw ApiError.NotFound({ model: "Car" });
  }

  if (plateNumber && plateNumber !== car.plateNumber) {
    const carExists = await findCarByPlateNumber(plateNumber);
    if (carExists) throw ApiError.Conflict("PlateNumber");
    data.plateNumber = plateNumber;
  }

  return await updateCar(carId, data);
};

export const getDetails = async (dataSafe: DTO.GetDetailsDto) => {
  const { carId } = dataSafe.params;

  const car = await findCarById(carId);
  if (!car) throw ApiError.NotFound({ model: "Car" });

  return car;
};

export const remove = async (dataSafe: DTO.DeleteDto) => {
  const { carId } = dataSafe.params;

  const car = await findCarById(carId);
  if (!car) throw ApiError.NotFound({ model: "Car" });

  return deleteCar(carId);
};

export const getAll = async (dataSafe: DTO.GetAllDto) => {
  const { query } = dataSafe;
  const { limit, page, search, gearType, isActive } = query;

  const where = buildCarWhere({ search, gearType, isActive });

  const { cars, count } = await findManyCars({
    where,
    take: limit,
    skip: Math.min(0, page - 1) * limit,
    orderBy: { createdAt: "desc" },
  });

  const { safePage, totalPages } = getPaginationParams({
    limit,
    page,
    count,
  });

  return {
    items: cars,
    pagination: { limit, page: safePage, total: count, totalPages },
  };
};
