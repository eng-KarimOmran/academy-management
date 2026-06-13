import { axiosClient } from "@/lib/axios";

import type {
  CreatePaymentTransactionDto,
  GetAllPaymentTransactionsDto,
  GetPaymentTransactionDetailsDto,
  DeletePaymentTransactionDto,
  ChangePaymentStatusDto,
} from "@/DTOs/transaction.dto";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Payment } from "@/types/transaction";

const baseUrl = (academyId: string) => `/academies/${academyId}/transactions`;

export const createPaymentTransaction = (data: CreatePaymentTransactionDto) => {
  const { academyId, ...body } = data;
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  return axiosClient.post<SuccessfulResponse<Payment>>(
    baseUrl(academyId),
    formData,
    { headers: { "Content-Type": "multipart/form-data", } }
  );
};

export const getAllPaymentTransactions = (
  data: GetAllPaymentTransactionsDto,
) => {
  const { academyId, ...query } = data;

  return axiosClient.get<PaginatedResponse<Payment>>(baseUrl(academyId), {
    params: query,
  });
};

export const getPaymentTransactionDetails = (
  params: GetPaymentTransactionDetailsDto,
) => {
  const { academyId, transactionId } = params;

  return axiosClient.get<SuccessfulResponse<Payment>>(
    `${baseUrl(academyId)}/${transactionId}`,
  );
};

export const changePaymentStatus = (data: ChangePaymentStatusDto) => {
  const { academyId, paymentId, ...body } = data;

  return axiosClient.patch<SuccessfulResponse<Payment>>(
    `${baseUrl(academyId)}/${paymentId}`,
    body,
  );
};

export const deletePaymentTransaction = (data: DeletePaymentTransactionDto) => {
  const { academyId, paymentId } = data;

  return axiosClient.delete<SuccessfulResponse<null>>(
    `${baseUrl(academyId)}/${paymentId}`,
  );
};
