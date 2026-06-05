import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  entityName,
  transmission,
  boolean,
  trainingSupport,
} from "@/validations/common.validation";

export const CreateAreaSchema = z.object({
  name: entityName,
  supportType: trainingSupport,
});

export const UpdateAreaSchema = z.object({
  name: entityName.optional(),
  supportType: trainingSupport.optional(),
  isActive: boolean.optional(),
});

export const DeleteAreaSchema = z.object({
  id,
});

export const GetAreaDetailsSchema = z.object({
  id,
});

export const GetAllAreasSchema = z.object({
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(10),
  search: z.string().optional(),
});

export const FilterAreasSchema = z.object({
  type: transmission.optional(),
});
