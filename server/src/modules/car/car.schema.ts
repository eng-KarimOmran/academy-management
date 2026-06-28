import z from "zod";
import {
  id,
  limit,
  boolean,
  transmission,
  entityName,
  price,
  positiveNumber,
  booleanQuery,
  page,
} from "../../shared/utils/common.validation";

export const CreateCarSchema = {
  params: z.object({ academyId: id }),
  body: z.object({
    plateNumber: entityName,
    modelName: entityName,
    gearType: transmission,
    carSessionPrice: price,
  }),
};

export const UpdateCarSchema = {
  params: z.object({ academyId: id, carId: id }),
  body: z.object({
    plateNumber: entityName.optional(),
    modelName: entityName.optional(),
    gearType: transmission.optional(),
    carSessionPrice: price.optional(),
    isActive: boolean.optional(),
  }),
};

export const GetAllCarsSchema = {
  params: z.object({ academyId: id }),
  query: z.object({
    page,
    limit,
    search: z.string().optional(),
    isActive: booleanQuery.optional(),
    gearType: transmission.optional(),
  }),
};

export const GetCarDetailsSchema = {
  params: z.object({ carId: id, academyId: id }),
};

export const DeleteCarSchema = {
  params: z.object({ carId: id, academyId: id }),
};