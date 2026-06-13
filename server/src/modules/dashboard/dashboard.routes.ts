import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import DashboardController from "./dashboard.controller";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";
import { GetDashboardAnalyticsSchema } from "./dashboard.schema";

const router = Router({ mergeParams: true });

router.use(isAcademyOwnerMiddleware)

router.get(
    "/courses",
    validation(GetDashboardAnalyticsSchema),
    DashboardController.courses
);

router.get(
    "/clients",
    validation(GetDashboardAnalyticsSchema),
    DashboardController.clients
);

router.get(
    "/subscriptions",
    validation(GetDashboardAnalyticsSchema),
    DashboardController.subscriptions
);

router.get(
    "/transactions",
    validation(GetDashboardAnalyticsSchema),
    DashboardController.transactions
);

router.get(
    "/lessons",
    validation(GetDashboardAnalyticsSchema),
    DashboardController.lessons
);
export default router;