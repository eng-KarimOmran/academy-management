import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  entityName,
  transmission,
  boolean,
  trainingSupport,
  booleanQuery,
} from "../../shared/utils/common.validation";

export const CreateAreaSchema = {
  body: z.object({
    name: entityName,
    supportType: trainingSupport.optional().default("BOTH"),
  }),
};

export const UpdateAreaSchema = {
  params: z.object({ areaId:id }),
  body: z.object({
    name: entityName.optional(),
    supportType: trainingSupport.optional(),
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
  params: z.object({ areaId:id }),
};

export const DeleteAreaSchema = {
  params: z.object({ areaId:id }),
};
