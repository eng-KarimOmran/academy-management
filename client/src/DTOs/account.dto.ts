import z from "zod";
import * as Schema from "../validations/account.validation";

export type GetEmployeesBalancesDto = {
  params: z.infer<typeof Schema.getEmployeesBalancesSchema.params>,
  query: z.infer<typeof Schema.getEmployeesBalancesSchema.query>
};

export type GetEmployeesDuesDto = {
  params: z.infer<typeof Schema.getEmployeesDuesSchema.params>,
  query: z.infer<typeof Schema.getEmployeesDuesSchema.query>
};

export type ProcessPayrollDto = {
  params: z.infer<typeof Schema.processPayrollSchema.params>,
  query: z.infer<typeof Schema.processPayrollSchema.query>
  body: z.infer<typeof Schema.processPayrollSchema.body>
};

export type ProcessPaymentDto = {
  params: z.infer<typeof Schema.ProcessPaymentSchema.params>,
  body: z.infer<typeof Schema.ProcessPaymentSchema.body>
};

export type ReceivePaymentDto = {
  params: z.infer<typeof Schema.ReceivePaymentSchema.params>,
  body: z.infer<typeof Schema.ReceivePaymentSchema.body>
};