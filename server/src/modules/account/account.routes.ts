import { Router } from "express";
import AccountController from "./account.controller";
import validation from "../../shared/middlewares/validation.middleware";
import * as Schema from "./account.schema";
import { uploadPaymentProof } from "../ledgerTransaction/ledgerTransaction.middleware";

const router = Router({ mergeParams: true });

router.get(
    "/balances",
    validation(Schema.getEmployeesBalancesSchema),
    AccountController.getEmployeesBalances
);

router.get(
    "/dues",
    validation(Schema.getEmployeesDuesSchema),
    AccountController.getEmployeesDues
);

router.post(
    "/:userId/payroll",
    validation(Schema.processPayrollSchema),
    AccountController.processPayroll
);

router.post(
    "/subscription/:subscriptionId/payment",
    uploadPaymentProof,
    validation(Schema.ProcessPaymentSchema),
    AccountController.processPayment
);

router.post(
    "/sender/:senderId/receive",
    validation(Schema.ReceivePaymentSchema),
    AccountController.receivePayment
);

export default router;