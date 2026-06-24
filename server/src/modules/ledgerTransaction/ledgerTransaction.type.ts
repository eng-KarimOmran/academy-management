import { PaginatedResponse } from "../../shared/types/types";
import { LedgerTransaction } from "../../../prisma/generated/client";
import * as DTO from "./ledgerTransaction.dto";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";

export interface ILedgerTransactionService {
    create: (data: DTO.CreateLedgerTransactionDto) => Promise<LedgerTransaction>;
    update: (data: DTO.UpdateLedgerTransactionDto) => Promise<LedgerTransaction>;
    delete: (data: DTO.DeleteLedgerTransactionDto) => Promise<LedgerTransaction>;
    getDetails: (data: DTO.GetLedgerTransactionDto) => Promise<LedgerTransaction>;
    getAll: (data: DTO.GetAllLedgerTransactionsDto) => Promise<PaginatedResponse<LedgerTransaction>>;
    getCurrentUserDues: (userId: string) => Promise<{ totalDebt: number }>
    getAcademyUsersDues: (academyId: string) => Promise<any>
}

export type GetTransferEntitiesParams = {
    senderId: string
    receiverId: string
    subscriptionId?: string
    tx: TransactionClient
}