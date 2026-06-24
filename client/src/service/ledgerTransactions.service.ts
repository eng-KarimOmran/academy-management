import { axiosClient } from "@/lib/axios";
import * as Dto from "@/DTOs/ledgerTransactions.dto";

import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Payment } from "@/types/transaction";

type Entity = Payment;

const ledgerTransactionsUrl = {
  base: (academyId: string) =>
    `/academies/${academyId}/transactions`,

  byId: (academyId: string, ledgerTransactionId: string) =>
    `/academies/${academyId}/transactions/${ledgerTransactionId}`,
};

export const createLedgerTransaction = (
  data: Dto.CreateLedgerTransactionDto
) => {
  const { params, body } = data;
  const { academyId } = params;

  return axiosClient.post<SuccessfulResponse<Entity>>(
    ledgerTransactionsUrl.base(academyId),
    body
  );
};

export const deleteLedgerTransaction = (
  data: Dto.DeleteLedgerTransactionDto
) => {
  const { params } = data;
  const { academyId, ledgerTransactionId } = params;

  return axiosClient.delete<SuccessfulResponse<null>>(
    ledgerTransactionsUrl.byId(academyId, ledgerTransactionId)
  );
};

export const getAllLedgerTransactions = (
  data: Dto.GetAllLedgerTransactionsDto
) => {
  const { params, query } = data;
  const { academyId } = params;

  return axiosClient.get<PaginatedResponse<Entity>>(
    ledgerTransactionsUrl.base(academyId),
    {
      params: query,
    }
  );
};

export const getLedgerTransactionDetails = (
  data: Dto.GetLedgerTransactionDetailsDto
) => {
  const { params } = data;
  const { academyId, ledgerTransactionId } = params;

  return axiosClient.get<SuccessfulResponse<Entity>>(
    ledgerTransactionsUrl.byId(academyId, ledgerTransactionId)
  );
};