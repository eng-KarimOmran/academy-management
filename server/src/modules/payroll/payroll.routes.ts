import { Router } from "express";
import * as Schema from "./payroll.schema";
import controller from "./payroll.controller";
import validate from "../../shared/middlewares/validate.middleware";
import allowJobProfiles from "../jobProfile/jobProfile.middlewares";

const router = Router({ mergeParams: true });

router.post(
    "/",
    validate(Schema.createPayrollSchema),
    allowJobProfiles(["MANAGER"]),
    controller.createPayroll,
);

router.get(
    "/preview",
    validate(Schema.getPayrollPreviewSchema),
    allowJobProfiles(["MANAGER"]),
    controller.getPayrollPreview,
);

router.get(
    "/",
    validate(Schema.getAllPayrollsSchema),
    allowJobProfiles(["MANAGER"]),
    controller.getAllPayrolls,
);

router.get(
    "/:payrollId",
    validate(Schema.getPayrollDetailsSchema),
    allowJobProfiles(["MANAGER"]),
    controller.getPayrollDetails,
);

router.delete(
    "/:payrollId",
    validate(Schema.deletePayrollSchema),
    allowJobProfiles(["MANAGER"]),
    controller.deletePayroll,
);

export default router;