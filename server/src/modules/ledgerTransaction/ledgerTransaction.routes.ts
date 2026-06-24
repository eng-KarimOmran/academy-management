import { uploadPaymentProof } from './ledgerTransaction.middleware';
import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import * as Schema from "./ledgerTransaction.schema";
import LedgerTransactionController from "./ledgerTransaction.controller";
import checkRole from "../../shared/middlewares/role.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  uploadPaymentProof,
  validation(Schema.CreateLedgerTransactionSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  LedgerTransactionController.createLedgerTransaction,
);

router.get(
  "/",
  validation(Schema.GetAllLedgerTransactionsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  LedgerTransactionController.getAllLedgerTransactions,
);

router.get(
  "/:ledgerTransactionId",
  validation(Schema.GetLedgerTransactionDetailsSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  LedgerTransactionController.getLedgerTransactionDetails,
);

router.delete(
  "/:ledgerTransactionId",
  validation(Schema.DeleteLedgerTransactionSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  LedgerTransactionController.deleteLedgerTransaction,
);

export default router;