import { carBaseSelect } from './car.selectors';
import { TransactionClient } from './../../../prisma/generated/internal/prismaNamespace';
import * as DTO from "./car.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { Prisma, Car } from "../../../prisma/generated/client"; // تأكد من الـ Import الخاص بموديل Car
import { prisma } from "../../lib/prisma";
import { buildCarWhere } from './cat.utils';

interface ICarService {
  create: (data: { dataSafe: DTO.CreateDto; tx?: TransactionClient }) => Promise<Car>;
  update: (data: { dataSafe: DTO.UpdateDto; tx?: TransactionClient }) => Promise<Car>;
  getDetails: (data: { dataSafe: DTO.GetDetailsDto; tx?: TransactionClient }) => Promise<Car>;
  delete: (data: { dataSafe: DTO.DeleteDto; tx?: TransactionClient }) => Promise<Car>;
  getAll: (data: { dataSafe: DTO.GetAllDto; tx?: TransactionClient }) => Promise<{ items: Car[]; pagination: { limit: number; page: number; totalPages: number; total: number } }>;
}

const CarService: ICarService = {
  async create({ dataSafe, tx }) {
    const { plateNumber, ...otherData } = dataSafe.body;

    const run = async (tx: TransactionClient) => {
      const carExists = await tx.car.findUnique({ where: { plateNumber }, select: carBaseSelect });
      if (carExists) throw ApiError.Conflict("PlateNumber");

      return await tx.car.create({
        data: { plateNumber, ...otherData }
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async update({ dataSafe, tx }) {
    const { body, params } = dataSafe;
    const { carId } = params;
    const { plateNumber, ...otherData } = body;

    const run = async (tx: TransactionClient) => {
      const car = await tx.car.findUnique({ where: { id: carId } });
      if (!car) throw ApiError.NotFound({ model: "Car" });

      const updateData: Prisma.CarUpdateInput = { ...otherData };

      if (plateNumber && plateNumber !== car.plateNumber) {
        const carExists = await tx.car.findUnique({ where: { plateNumber } });
        if (carExists) throw ApiError.Conflict("PlateNumber");
        updateData.plateNumber = plateNumber;
      }

      return await tx.car.update({
        where: { id: carId },
        data: updateData,
        select: carBaseSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getDetails({ dataSafe, tx }) {
    const { carId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const car = await tx.car.findUnique({ where: { id: carId }, select: carBaseSelect });
      if (!car) throw ApiError.NotFound({ model: "Car" });

      return car;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async delete({ dataSafe, tx }) {
    const { carId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const car = await tx.car.findUnique({ where: { id: carId, select: carBaseSelect } });
      if (!car) throw ApiError.NotFound({ model: "Car" });

      return await tx.car.delete({ where: { id: carId } });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getAll({ dataSafe, tx }) {
    const { limit, page, search, gearType, isActive } = dataSafe.query;

    const run = async (tx: TransactionClient) => {
      const { take, skip } = getPagination({ page, limit });
      const where = buildCarWhere({ gearType, isActive, search })

      const [cars, count] = await Promise.all([
        tx.car.findMany({
          where,
          take,
          skip,
          orderBy: { createdAt: "desc" },
          select: carBaseSelect
        }),
        tx.car.count({ where })
      ]);

      const totalPages = getTotalPages({ limit, count });
      const pagination = { limit, page, totalPages, total: count };

      return { items: cars, pagination };
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  }
};

export default CarService;