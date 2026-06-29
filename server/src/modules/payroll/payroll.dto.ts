import z from "zod";
import * as Schema from "./payroll.schema";

export type CreatePayrollDto = {
    params: z.infer<typeof Schema.createPayrollSchema.params>;
    body: z.infer<typeof Schema.createPayrollSchema.body>;
};

export type DeletePayrollDto = {
    params: z.infer<typeof Schema.deletePayrollSchema.params>;
};

export type GetPayrollDetailsDto = {
    params: z.infer<typeof Schema.getPayrollDetailsSchema.params>;
};

export type GetAllPayrollsDto = {
    params: z.infer<typeof Schema.getAllPayrollsSchema.params>;
    query: z.infer<typeof Schema.getAllPayrollsSchema.query>;
};

export type GetPayrollPreviewDto = {
    params: z.infer<typeof Schema.getPayrollPreviewSchema.params>;
};