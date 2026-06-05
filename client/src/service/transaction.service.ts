import { axiosClient } from "@/lib/axios";

import type {
  CreatePaymentTransactionDto,
  GetAllPaymentTransactionsDto,
  GetPaymentTransactionDetailsDto,
  UpdatePaymentTransactionDto,
  DeletePaymentTransactionDto,
} from "@/DTOs/transaction.dto";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Payment } from "@/types/transaction";

export const createPaymentTransaction = (data: CreatePaymentTransactionDto) => {
  const { academyId, ...body } = data;

  return axiosClient.post<SuccessfulResponse<Payment>>(
    `/academy/${academyId}/transactions`,
    body,
  );
};

export const getAllPaymentTransactions = (
  params: GetAllPaymentTransactionsDto,
) => {
  const { academyId, ...query } = params;

  return axiosClient.get<PaginatedResponse<Payment>>(
    `/academy/${academyId}/transactions`,
    {
      params: query,
    },
  );
};

export const getPaymentTransactionDetails = (
  params: GetPaymentTransactionDetailsDto,
) => {
  const { academyId, paymentId } = params;

  return axiosClient.get<SuccessfulResponse<Payment>>(
    `/academy/${academyId}/transactions/${paymentId}`,
  );
};

export const updatePaymentTransaction = (data: UpdatePaymentTransactionDto) => {
  const { academyId, paymentId, ...body } = data;

  return axiosClient.patch<SuccessfulResponse<Payment>>(
    `/academy/${academyId}/transactions/${paymentId}`,
    body,
  );
};

export const deletePaymentTransaction = (data: DeletePaymentTransactionDto) => {
  const { academyId, paymentId } = data;

  return axiosClient.delete<SuccessfulResponse<null>>(
    `/academy/${academyId}/transactions/${paymentId}`,
  );
};
