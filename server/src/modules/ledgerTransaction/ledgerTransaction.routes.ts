import { Router } from "express";
import LedgerTransactionController from "./ledgerTransaction.controller";
import * as Schema from "./ledgerTransaction.schema";
import validate from "../../shared/middlewares/validate.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validate(Schema.CreateLedgerTransactionSchema),
  checkAcademyExists(),
  LedgerTransactionController.createLedgerTransaction
);

router.get(
  "/",
  validate(Schema.GetAllLedgerTransactionsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  LedgerTransactionController.getAllLedgerTransactions
);

router.get(
  "/:ledgerTransactionId",
  validate(Schema.GetLedgerTransactionDetailsSchema),
  checkAcademyExists(),
  LedgerTransactionController.getLedgerTransactionDetails
);

export default router;