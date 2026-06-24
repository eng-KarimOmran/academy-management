import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import DashboardController from "./dashboard.controller";
import { checkAcademyExists } from "../academy/academy.middleware";
import { GetDashboardAnalyticsSchema } from "./dashboard.schema";

const router = Router({ mergeParams: true });

router.use(checkAcademyExists({ isAcademyOwner: true }))


router.get(
    "/",
    validation(GetDashboardAnalyticsSchema),
    DashboardController.getStatistics
);

export default router;