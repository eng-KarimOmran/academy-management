import z from "zod";
import {
  id,
  limit,
  boolean,
  entityName,
  booleanQuery,
  page,
  supportType,
} from "../../shared/utils/common.validation";

export const CreateAreaSchema = {
  params: z.object({
    academyId: id,
  }),
  body: z.object({
    name: entityName,
    supportType,
  }),
};

export const UpdateAreaSchema = {
  params: z.object({
    academyId: id,
    areaId: id,
  }),
  body: z.object({
    name: entityName.optional(),
    supportType: supportType.optional(),
    isActive: boolean.optional(),
  }),
};

export const GetAllAreasSchema = {
  params: z.object({
    academyId: id,
  }),
  query: z.object({
    page,
    limit,
    search: z.string().optional(),
    isActive: booleanQuery.optional(),
    supportType: supportType.optional(),
  }),
};

export const GetAreaDetailsSchema = {
  params: z.object({
    academyId: id,
    areaId: id,
  }),
};

export const DeleteAreaSchema = {
  params: z.object({
    academyId: id,
    areaId: id,
  }),
};