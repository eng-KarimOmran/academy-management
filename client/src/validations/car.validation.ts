import z from "zod";

import {
  id,
  limit,
  boolean,
  transmission,
  entityName,
  price,
  positiveNumber,
} from "@/validations/common.validation";

export const CreateCarSchema = z.object({
  plateNumber: entityName,
  modelName: entityName,
  gearType: transmission,
  carSessionPrice: price,
});

export const UpdateCarSchema = z.object({
  carId: id,
  plateNumber: entityName,
  modelName: entityName,
  gearType: transmission,
  carSessionPrice: price,
  isActive: boolean,
});

export const GetAllCarsSchema = z.object({
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(10),
  search: z.string().optional(),
});

export const GetCarDetailsSchema = z.object({
  carId: id,
});

export const DeleteCarSchema = z.object({
  carId: id,
});

export const FilterByTypeSchema = z.object({
  type: transmission.optional(),
});