import { Response } from "express";
import * as DTO from "./paymentTransaction.dto";
import PaymentTransactionService from "./paymentTransaction.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestAcademy } from "../academy/academy.middleware";

const PaymentTransactionController = {
  createPaymentTransaction: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreatePaymentTransactionDto;
    const { id } = req.userLogin!;

    const proofImage = req.file
      ? {
        imageUrl: req.file.path,
        publicId: req.file.filename,
      }
      : undefined;

    const paymentTransaction = await PaymentTransactionService.createPayment(
      id,
      dataSafe,
      proofImage
    );

    return sendSuccess({
      res,
      statusCode: 201,
      data: paymentTransaction,
      message: "تم إنشاء عملية الدفع بنجاح.",
    });
  },

  getAllPaymentTransactions: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllPaymentTransactionsDto;

    const data = await PaymentTransactionService.getAllPaymentTransactions(dataSafe);

    return sendSuccess({ res, data });
  },

  getPaymentTransactionDetails: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetPaymentTransactionDetailsDto;

    const transactionData = await PaymentTransactionService.getPaymentTransactionDetails(dataSafe);

    return sendSuccess({ res, data: transactionData });
  },

  changeStatusPaymentTransaction: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.ChangePaymentStatusDto;

    const updatedTransaction = await PaymentTransactionService.changePaymentStatus(dataSafe);

    return sendSuccess({
      res,
      data: updatedTransaction,
      message: "تم تحديث حالة عملية الدفع وتعديل تسوية الخزينة التلقائية بنجاح.",
    });
  }
};

export default PaymentTransactionController;