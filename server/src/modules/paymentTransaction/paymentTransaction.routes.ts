import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./paymentTransaction.schema";
import PaymentTransactionController from "./paymentTransaction.controller";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";
import { uploadPaymentProof } from "./paymentTransaction.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  uploadPaymentProof,
  validation(Schema.CreatePaymentTransactionSchema),
  checkRole(["OWNER", "SECRETARY"]),
  PaymentTransactionController.createPaymentTransaction,
);

router.get(
  "/",
  validation(Schema.GetAllPaymentTransactionsSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  PaymentTransactionController.getAllPaymentTransactions,
);

router.get(
  "/:paymentId",
  validation(Schema.GetPaymentTransactionDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  PaymentTransactionController.getPaymentTransactionDetails,
);

router.patch(
  "/:paymentId",
  validation(Schema.ChangePaymentStatusSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  PaymentTransactionController.changeStatusPaymentTransaction,
);

export default router;