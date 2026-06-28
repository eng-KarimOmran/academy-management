import { Router } from "express";
import validate from "../../shared/middlewares/validate.middleware";
import * as Schema from "./employee.schema"
import EmployeeController from "./employee.controller";
import allowJobProfiles from "../jobProfile/jobProfile.middlewares";
import { checkAcademyExists } from "../academy/academy.middleware";
const router = Router();

router.get(
    "/my-lessons",
    validate(Schema.GetMyLessonsSchema),
    EmployeeController.getMyLessons,
);

router.get(
    "/my-debt",
    EmployeeController.getTrainerDebt,
);

router.get(
    "/dashboard-manager/:academyId",
    validate(Schema.GetDashboardManagerSchema),
    checkAcademyExists(),
    allowJobProfiles(["MANAGER"]),
    EmployeeController.getDashboardManager,
);

export default router;