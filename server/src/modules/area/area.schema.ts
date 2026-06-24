import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  entityName,
  transmission,
  booleanQuery,
  boolean,
} from "../../shared/utils/common.validation";

export const AreaSchema = {
  create: {
    params: z.object({
      academyId: id,
    }),
    body: z.object({
      name: entityName,
      supportType: transmission,
    }),
  },

  update: {
    params: z.object({
      academyId: id,
      areaId: id,
    }),
    body: z.object({
      name: entityName.optional(),
      supportType: transmission.optional(),
      isActive: boolean.optional(),
    }),
  },

  delete: {
    params: z.object({
      academyId: id,
      areaId: id,
    }),
  },

  get: {
    params: z.object({
      academyId: id,
      areaId: id,
    }),
  },

  getAll: {
    params: z.object({
      academyId: id,
    }),
    query: z.object({
      page: positiveNumber.optional().default(1),
      search: z.string().optional(),
      supportType: transmission.optional(),
      isActive: booleanQuery.optional(),
      limit: limit,
    }),
  },
};