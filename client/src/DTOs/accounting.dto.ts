import z from "zod";
import * as Schema from "../validations/accounting.validation";

export type AddFinancialRecordDto = {
  params: z.infer<typeof Schema.AddFinancialRecordSchema.params>;
  body: z.infer<typeof Schema.AddFinancialRecordSchema.body>;
};

export type DeleteFinancialRecordDto = {
  params: z.infer<typeof Schema.DeleteFinancialRecordSchema.params>;
};

export type GetStaffFinancialRecordsDto = {
  params: z.infer<typeof Schema.GetStaffFinancialRecordsSchema.params>;
  query: z.infer<typeof Schema.GetStaffFinancialRecordsSchema.query>;
};
