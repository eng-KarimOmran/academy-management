import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import DashboardController from "./dashboard.controller";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";
import { GetDashboardAnalyticsSchema } from "./dashboard.schema";

const router = Router({ mergeParams: true });

router.get(
    "/analytics",
    validation(GetDashboardAnalyticsSchema),
    checkRole(["OWNER"]),
    isAcademyOwnerMiddleware,
    DashboardController.getOwnerDashboardAnalytics
);

export default router;