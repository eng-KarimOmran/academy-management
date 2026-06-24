import { Response } from "express";
import * as DTO from "./ledgerTransaction.dto";
import ledgerTransactionService from "./ledgerTransaction.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestAcademy } from "../academy/academy.middleware";

const LedgerTransactionController = {
  createLedgerTransaction: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateLedgerTransactionDto;


    const dataImg = req.file ? {
      publicId: (req.file).filename,
      imageUrl: req.file.path
    } : undefined;

    const result = await ledgerTransactionService.create({
      dataSafe,
      dataImg
    });

    return sendSuccess({
      res,
      statusCode: 201,
      data: result,
      message: "تم إنشاء المعاملة بنجاح.",
    });
  },

  getAllLedgerTransactions: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllLedgerTransactionsDto;

    const result = await ledgerTransactionService.getAll({
      dataSafe,
    });

    return sendSuccess({
      res,
      data: result,
    });
  },

  getLedgerTransactionDetails: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetLedgerTransactionDetailsDto;

    const result = await ledgerTransactionService.getDetails({
      dataSafe,
    });

    return sendSuccess({
      res,
      data: result,
    });
  },

  deleteLedgerTransaction: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteLedgerTransactionDto;

    const result = await ledgerTransactionService.delete({
      dataSafe,
    });

    return sendSuccess({
      res,
      data: result,
      message: "تم حذف المعاملة بنجاح.",
    });
  },
  getEmployeesBalances: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetEmployeesBalancesDto;

    const data = await ledgerTransactionService.getEmployeesBalances({ data: dataSafe });

    return sendSuccess({
      res,
      data
    });
  },

  getEmployeesDues: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetEmployeesDuesDto;

    const data = await ledgerTransactionService.getEmployeesDues({ data: dataSafe });

    return sendSuccess({
      res,
      data
    });
  },

  processPayroll: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.ProcessPayrollDto;

    const data = await ledgerTransactionService.processPayroll({ data: dataSafe });

    return sendSuccess({
      res,
      statusCode: 201,
      data,
      message: "تم معالجة كشف المرتبات بنجاح",
    });
  },

  processPayment: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.ProcessPaymentDto;
    const userLoginId = req.userLogin!.id;

    const dataImg = req.file ? {
      publicId: (req.file).filename,
      imageUrl: req.file.path
    } : undefined;

    const data = await ledgerTransactionService.processPayment({
      data: dataSafe,
      userLoginId,
      dataImg
    });

    return sendSuccess({
      res,
      statusCode: 201,
      data,
      message: "تم معالجة الدفع بنجاح",
    });
  },

  receivePayment: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.ReceivePaymentDto;
    const userLoginId = req.userLogin!.id;

    const data = await ledgerTransactionService.receivePayment({
      data: dataSafe,
      userLoginId
    });

    return sendSuccess({
      res,
      statusCode: 201,
      data,
      message: "تم استلام الدفعة بنجاح",
    });
  }
};

export default LedgerTransactionController;