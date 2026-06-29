import { z } from "zod";
import {
  id,
  page,
  limit,
  date,
} from "../../shared/utils/common.validation";

export const createPayrollSchema = {
  params: z.object({
    academyId: id,
  }),

  body: z.object({
    jobProfileId: id,
  }),
};

export const deletePayrollSchema = {
  params: z.object({
    academyId: id,
    payrollId: id,
  }),
};

export const getPayrollDetailsSchema = {
  params: z.object({
    academyId: id,
    payrollId: id,
  }),
};

export const getAllPayrollsSchema = {
  params: z.object({
    academyId: id,
  }),

  query: z.object({
    page,
    limit,
    search: z.string().optional(),
  }),
};

export const getPayrollPreviewSchema = {
  params: z.object({ academyId: id }),
};