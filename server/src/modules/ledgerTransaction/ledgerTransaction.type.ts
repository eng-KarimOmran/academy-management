import { LedgerTransaction } from "../../../prisma/generated/browser";
import { PaginatedResponse } from "../../shared/types/types";
import { AcademyRequestHandler } from "../academy/academy.type";

import {
    CreateLedgerTransactionDto,
    GetAllLedgerTransactionsDto,
    GetLedgerTransactionDetailsDto,
} from "./ledgerTransaction.dto";

export interface ILedgerTransactionService {
    createLedgerTransaction(
        data: CreateLedgerTransactionDto
    ): Promise<LedgerTransaction>;

    getAllLedgerTransactions(
        data: GetAllLedgerTransactionsDto
    ): Promise<PaginatedResponse<LedgerTransaction>>;

    getLedgerTransactionDetails(
        data: GetLedgerTransactionDetailsDto
    ): Promise<LedgerTransaction>;
}

export interface ILedgerTransactionController {
    createLedgerTransaction: AcademyRequestHandler;

    getAllLedgerTransactions: AcademyRequestHandler;

    getLedgerTransactionDetails: AcademyRequestHandler;
}