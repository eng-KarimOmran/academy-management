import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./academy.Schema";
import checkRole from "../../middlewares/role.middleware";
import routerCourse from "../course/course.routes";
import routerClient from "../client/client.routes";
import routerSubscription from "../subscription/subscription.routes";
import routerTransactions from "../paymentTransaction/paymentTransaction.routes";
import routerLesson from "../lesson/lesson.routes";
import routerLedger from "../ledger/ledger.routes";
import AcademyController from "./academy.controller";
import routerStatistics from "../dashboard/dashboard.routes";

import { checkAcademyExists, isAcademyOwnerMiddleware } from "./academy.middleware";

const router = Router();


router.get(
  "/",
  validation(Schema.GetAllAcademiesSchema),
  checkRole(["OWNER", "SECRETARY"]),
  AcademyController.getAllAcademy,
);

router.post(
  "/",
  validation(Schema.CreateAcademySchema),
  checkRole(["OWNER"]),
  AcademyController.createAcademy,
);

router.use("/:academyId", checkAcademyExists);

router.post(
  "/:academyId/owner",
  validation(Schema.AddOwnerSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  AcademyController.addOwnerAcademy,
);

router.delete(
  "/:academyId/owner/:ownerId",
  validation(Schema.DeleteOwnerSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  AcademyController.deleteOwnerAcademy,
);

router.post(
  "/:academyId/social-media",
  validation(Schema.AddSocialMediaSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  AcademyController.addSocialMediaAcademy,
);

router.delete(
  "/:academyId/social-media/:platformId",
  validation(Schema.DeleteSocialMediaSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  AcademyController.deleteSocialMediaAcademy,
);

router.get(
  "/:academyId",
  validation(Schema.GetAcademySchema),
  AcademyController.getDetailsAcademy,
);

router.patch(
  "/:academyId",
  validation(Schema.UpdateAcademySchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  AcademyController.updateAcademy,
);

router.delete(
  "/:academyId",
  validation(Schema.DeleteAcademySchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  AcademyController.deleteAcademy,
);

router.use("/:academyId/clients", routerClient);

router.use("/:academyId/courses", routerCourse);

router.use("/:academyId/subscriptions", routerSubscription);

router.use("/:academyId/transactions", routerTransactions);

router.use("/:academyId/lessons", routerLesson);

router.use("/:academyId/ledgers", routerLedger);

router.use("/:academyId/statistics", routerStatistics);

export default router;