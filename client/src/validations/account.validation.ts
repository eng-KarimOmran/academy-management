import z from "zod";

import {
  date,
  id,
  paymentMethod,
  price,
  transactionType
} from "@/validations/common.validation";

export const getEmployeesBalancesSchema = {
  params: z.object({ academyId: id }),
  query: z.object({ startDate: date, endDate: date }),

};

export const getEmployeesDuesSchema = {
  params: z.object({ academyId: id }),
  query: z.object({ startDate: date, endDate: date }),
};

export const processPayrollSchema = {
  params: z.object({ academyId: id, userId: id }),
  query: z.object({ startDate: date, endDate: date }),
  body: z.object({ grossSalary: price }),
}

export const ProcessPaymentSchema = {
  params: z.object({ academyId: id, subscriptionId: id }),
  body: z.object({ amount: price, transactionType, paymentMethod, }),
}

export const ReceivePaymentSchema = {
  params: z.object({ academyId: id, senderId: id }),
  body: z.object({ amount: price }),
};