import { LedgerTransaction } from "../../../prisma/generated/browser";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import { PaginatedResponse } from "../../shared/types/types";
import { AcademyRequestHandler } from "../academy/academy.type";
import { JobProfileRequestHandler } from "../jobProfile/jobProfile.type";

import {
    CreateLedgerTransactionDto,
    GetAllLedgerTransactionsDto,
    GetLedgerTransactionDetailsDto,
} from "./ledgerTransaction.dto";

export interface ILedgerTransactionService {
    createLedgerTransaction(
        data: CreateLedgerTransactionDto & { tx?: TransactionClient, academyAccountId?: string, employeeAccountId?: string }
    ): Promise<LedgerTransaction>;

    getAllLedgerTransactions(
        data: GetAllLedgerTransactionsDto
    ): Promise<PaginatedResponse<LedgerTransaction>>;

    getLedgerTransactionDetails(
        data: GetLedgerTransactionDetailsDto
    ): Promise<LedgerTransaction>;
}

export interface ILedgerTransactionController {
    createLedgerTransaction: JobProfileRequestHandler;

    getAllLedgerTransactions: AcademyRequestHandler;

    getLedgerTransactionDetails: JobProfileRequestHandler;
}