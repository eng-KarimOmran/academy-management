import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";
import * as Schema from "./ledger.schema";
import LedgerController from "./ledger.controller";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validation(Schema.GetLedgerTransactionsSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  LedgerController.getAllLedgerTransactions,
);

router.post(
  "/",
  validation(Schema.CreateLedgerTransactionSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  LedgerController.createLedgerTransaction,
);

router.get(
  "/account/:userId",
  validation(Schema.getUserAccountsSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  LedgerController.getUserAccounts,
);

router.get(
  "/:ledgerId",
  validation(Schema.GetLedgerDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  isAcademyOwnerMiddleware,
  LedgerController.getLedgerDetails,
);

router.patch(
  "/:ledgerId",
  validation(Schema.UpdateLedgerTransactionSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  LedgerController.updateLedgerTransaction,
);

router.delete(
  "/:ledgerId",
  validation(Schema.DeleteLedgerSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  LedgerController.deleteLedgerTransaction,
);

export default router;