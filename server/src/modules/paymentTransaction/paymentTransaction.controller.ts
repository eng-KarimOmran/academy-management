import { Response } from "express";
import * as DTO from "./paymentTransaction.dto";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as PaymentTransactionService from "./paymentTransaction.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestAcademy } from "../academy/academy.middleware";

export const createPaymentTransaction = async (
  req: RequestAuth,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.CreatePaymentTransactionDto;
  const { id } = req.userLogin!;

  const paymentTransaction = await PaymentTransactionService.createPayment(
    id,
    dataSafe,
  );

  return sendSuccess({
    res,
    statusCode: 201,
    data: paymentTransaction,
    message: "تم إنشاء عملية الدفع بنجاح.",
  });
};

export const getAllPaymentTransactions = async (
  req: RequestAcademy,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.GetAllPaymentTransactionsDto;

  const data =
    await PaymentTransactionService.getAllPaymentTransactions(dataSafe);

  return sendSuccess({
    res,
    data,
  });
};

export const getPaymentTransactionDetails = async (
  req: RequestAuth,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.GetPaymentTransactionDetailsDto;

  const transactionData =
    await PaymentTransactionService.getPaymentTransactionDetails(dataSafe);

  return sendSuccess({
    res,
    data: transactionData,
  });
};

export const changeStatusPaymentTransaction = async (
  req: RequestAuth,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.ChangePaymentStatusDto;

  const updatedTransaction =
    await PaymentTransactionService.changePaymentStatus(dataSafe);

  return sendSuccess({
    res,
    data: updatedTransaction,
    message: "تم تحديث حالة عملية الدفع بنجاح.",
  });
};