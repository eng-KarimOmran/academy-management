import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./paymentTransaction.schema";
import * as controller from "./paymentTransaction.controller";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validation(Schema.CreatePaymentTransactionSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.createPaymentTransaction,
);

router.get(
  "/",
  validation(Schema.GetAllPaymentTransactionsSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.getAllPaymentTransactions,
);

router.get(
  "/:paymentId",
  validation(Schema.GetPaymentTransactionDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getPaymentTransactionDetails,
);

router.patch(
  "/:paymentId",
  validation(Schema.ChangePaymentStatusSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.changeStatusPaymentTransaction,
);

export default router;