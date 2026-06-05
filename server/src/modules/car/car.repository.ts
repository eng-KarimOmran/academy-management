import {
  CarCreateInput,
  CarOrderByWithRelationInput,
  CarUpdateInput,
  CarWhereInput,
} from "../../../prisma/generated/models";
import { prisma } from "../../lib/prisma";
import { carBaseSelect } from "./car.selectors";

export const createCar = async (data: CarCreateInput) => {
  return await prisma.car.create({ data, select: carBaseSelect });
};

export const findCarById = async (id: string) => {
  return await prisma.car.findUnique({ where: { id }, select: carBaseSelect });
};

export const findCarByPlateNumber = async (plateNumber: string) => {
  return await prisma.car.findUnique({
    where: { plateNumber },
    select: carBaseSelect,
  });
};

export const updateCar = async (id: string, data: CarUpdateInput) => {
  return await prisma.car.update({
    where: { id },
    data,
    select: carBaseSelect,
  });
};

export const deleteCar = async (id: string) => {
  return await prisma.car.delete({ where: { id }, select: carBaseSelect });
};

export const findManyCars = async (data: {
  where: CarWhereInput;
  skip: number;
  take: number;
  orderBy: CarOrderByWithRelationInput;
}) => {
  const [cars, count] = await prisma.$transaction([
    prisma.car.findMany({ ...data, select: carBaseSelect }),
    prisma.car.count({ where: data.where }),
  ]);

  return { cars, count };
};