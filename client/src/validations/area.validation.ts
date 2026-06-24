import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  entityName,
  transmission,
  boolean,
  supportType,
  booleanQuery,
} from "@/validations/common.validation";

export const CreateAreaSchema = {
  body: z.object({
    name: entityName,
    supportType: supportType,
  }),
};

export const UpdateAreaSchema = {
  params: z.object({ areaId: id }),
  body: z.object({
    name: entityName.optional(),
    supportType: supportType.optional(),
    isActive: boolean.optional(),
  }),
};

export const GetAllAreasSchema = {
  query: z.object({
    page: positiveNumber.optional().default(1),
    search: z.string().optional(),
    supportType: transmission.optional(),
    isActive: booleanQuery.optional(),
    limit: limit,
  }),
};

export const GetAreaDetailsSchema = {
  params: z.object({ areaId: id }),
};

export const DeleteAreaSchema = {
  params: z.object({ areaId: id }),
};