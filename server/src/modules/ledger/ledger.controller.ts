import { Response } from "express";

import { RequestAcademy } from "../academy/academy.middleware";

import sendSuccess from "../../shared/utils/successResponse";

import * as DTO from "./ledger.dto";
import * as LedgerService from "./ledger.service";

export const createLedgerTransaction = async (
  req: RequestAcademy,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.CreateLedgerTransactionDto;

  const ledger = await LedgerService.create(dataSafe);

  return sendSuccess({
    res,
    statusCode: 201,
    data: ledger,
    message: "تم إضافة المعاملة المالية بنجاح",
  });
};

export const getAllLedgerTransactions = async (
  req: RequestAcademy,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.GetLedgerTransactionsDto;

  const data = await LedgerService.getAll(dataSafe);

  return sendSuccess({
    res,
    data,
  });
};

export const getLedgerDetails = async (req: RequestAcademy, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetLedgerDetailsDto;

  const ledger = await LedgerService.getDetails(dataSafe);

  return sendSuccess({
    res,
    data: ledger,
  });
};

export const getUserAccounts = async (req: RequestAcademy, res: Response) => {
  const dataSafe = req.dataSafe as DTO.getUserAccountsDto;

  const data = await LedgerService.getUserAccounts(dataSafe);

  return sendSuccess({
    res,
    data,
  });
};