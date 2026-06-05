import { Router } from "express";

import validation from "../../middlewares/validation.middleware";
import checkRole from "../../middlewares/role.middleware";

import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";

import * as Schema from "./ledger.schema";
import * as controller from "./ledger.controller";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validation(Schema.GetLedgerTransactionsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getAllLedgerTransactions,
);

router.post(
  "/",
  validation(Schema.CreateLedgerTransactionSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.createLedgerTransaction,
);

router.get(
  "/account/:userId",
  validation(Schema.getUserAccountsSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.getUserAccounts,
);

router.get(
  "/:ledgerId",
  validation(Schema.GetLedgerDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getLedgerDetails,
);

export default router;
