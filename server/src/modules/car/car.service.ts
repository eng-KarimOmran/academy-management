import * as DTO from "./car.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { CarUpdateInput } from "../../../prisma/generated/models";
import CarRepository from "./car.repository";
import { buildCarWhere } from "./cat.utils";

const CarService = {
  async create(dataSafe: DTO.CreateDto) {
    const { plateNumber, ...otherData } = dataSafe.body;

    const carExists = await CarRepository.findByPlateNumber({ plateNumber });
    if (carExists) throw ApiError.Conflict("PlateNumber");

    return await CarRepository.create({
      data: { plateNumber, ...otherData }
    });
  },

  async update(dataSafe: DTO.UpdateDto) {
    const { body, params } = dataSafe;
    const { carId } = params;
    const { plateNumber, ...otherData } = body;

    const car = await CarRepository.findById({ carId });
    if (!car) throw ApiError.NotFound({ model: "Car" });

    const data: CarUpdateInput = { ...otherData };

    if (plateNumber && plateNumber !== car.plateNumber) {
      const carExists = await CarRepository.findByPlateNumber({ plateNumber });
      if (carExists) throw ApiError.Conflict("PlateNumber");
      data.plateNumber = plateNumber;
    }

    return await CarRepository.update({ carId, data });
  },

  async getDetails(dataSafe: DTO.GetDetailsDto) {
    const { carId } = dataSafe.params;

    const car = await CarRepository.findById({ carId });
    if (!car) throw ApiError.NotFound({ model: "Car" });

    return car;
  },

  async remove(dataSafe: DTO.DeleteDto) {
    const { carId } = dataSafe.params;

    const car = await CarRepository.findById({ carId });
    if (!car) throw ApiError.NotFound({ model: "Car" });

    return await CarRepository.delete({ carId });
  },

  async getAll(dataSafe: DTO.GetAllDto) {
    const { limit, page, search, gearType, isActive } = dataSafe.query;

    const where = buildCarWhere({ search, gearType, isActive });
    const { take, skip } = getPagination({ page, limit });

    const { cars, count } = await CarRepository.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, totalPages, total: count };

    return { items: cars, pagination };
  }
};

export default CarService;