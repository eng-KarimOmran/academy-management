import { Response } from "express";
import { RequestAcademy } from "../academy/academy.middleware";
import sendSuccess from "../../shared/utils/successResponse";
import * as DTO from "./ledger.dto";
import LedgerService from "./ledger.service";

const LedgerController = {
  createLedgerTransaction: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateLedgerTransactionDto;

    const ledger = await LedgerService.create(dataSafe);

    return sendSuccess({
      res,
      statusCode: 201,
      data: ledger,
      message: "تم إضافة المعاملة المالية بنجاح",
    });
  },

  updateLedgerTransaction: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateLedgerTransactionDto;

    const updatedLedger = await LedgerService.update(dataSafe);

    return sendSuccess({
      res,
      data: updatedLedger,
      message: "تم تحديث المعاملة المالية بنجاح",
    });
  },

  deleteLedgerTransaction: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteLedgerDto;


    await LedgerService.delete(dataSafe);

    return sendSuccess({
      res,
      message: "تم حذف المعاملة المالية بنجاح",
    });
  },

  getAllLedgerTransactions: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetLedgerTransactionsDto;

    const data = await LedgerService.getAll(dataSafe);

    return sendSuccess({
      res,
      data,
    });
  },

  getLedgerDetails: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetLedgerDetailsDto;

    const ledger = await LedgerService.getDetails(dataSafe);

    return sendSuccess({
      res,
      data: ledger,
    });
  },

  getUserAccounts: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.getUserAccountsDto;

    const data = await LedgerService.getUserAccounts(dataSafe);

    return sendSuccess({
      res,
      data,
    });
  },
};

export default LedgerController;