import * as DTO from "./ledgerTransaction.dto";
import LedgerTransactionService from "./ledgerTransaction.service";
import sendSuccess from "../../shared/utils/successResponse";
import { ILedgerTransactionController } from "./ledgerTransaction.type";

const LedgerTransactionController: ILedgerTransactionController = {
  createLedgerTransaction: async (req, res) => {
    const dataSafe = req.dataSafe as DTO.CreateLedgerTransactionDto;
    const { body, params } = dataSafe
    const academyAccountId = req.academy?.financialAccount?.id
    const employeeAccountId = req.jobProfile?.financialAccount?.id

    const ledgerTransaction = await LedgerTransactionService.createLedgerTransaction({ body, params, academyAccountId, employeeAccountId });

    return sendSuccess({
      res,
      statusCode: 201,
      data: ledgerTransaction,
      message: "تم إنشاء الحركة المالية بنجاح",
    });
  },

  getAllLedgerTransactions: async (req, res) => {
    const dataSafe = req.dataSafe as DTO.GetAllLedgerTransactionsDto;

    const data = await LedgerTransactionService.getAllLedgerTransactions(dataSafe);

    return sendSuccess({
      res,
      data,
    });
  },

  getLedgerTransactionDetails: async (req, res) => {
    const dataSafe = req.dataSafe as DTO.GetLedgerTransactionDetailsDto;

    const ledgerTransaction = await LedgerTransactionService.getLedgerTransactionDetails(dataSafe);

    return sendSuccess({
      res,
      data: ledgerTransaction,
    });
  },
};

export default LedgerTransactionController;