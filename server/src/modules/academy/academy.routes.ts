import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./academy.Schema";
import * as controller from "./academy.controller";
import checkRole from "../../middlewares/role.middleware";
import routerCourse from "../course/course.routes";
import routerClient from "../client/client.routes";
import routerSubscription from "../subscription/subscription.routes";
import routerTransactions from "../paymentTransaction/paymentTransaction.routes";
import routerLesson from "../lesson/lesson.routes";
import routerLedger from "../ledger/ledger.routes";

import {
  checkAcademyExists,
  isAcademyOwnerMiddleware,
} from "./academy.middleware";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllAcademiesSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getAllAcademy,
);

router.post(
  "/",
  validation(Schema.CreateAcademySchema),
  checkRole(["OWNER"]),
  controller.createAcademy,
);

router.post(
  "/:academyId/owner",
  validation(Schema.AddOwnerSchema),
  checkRole(["OWNER"]),
  checkAcademyExists,
  isAcademyOwnerMiddleware,
  controller.addOwnerAcademy,
);

router.delete(
  "/:academyId/owner/:ownerId",
  validation(Schema.DeleteOwnerSchema),
  checkRole(["OWNER"]),
  checkAcademyExists,
  isAcademyOwnerMiddleware,
  controller.deleteOwnerAcademy,
);

router.post(
  "/:academyId/social-media",
  validation(Schema.AddSocialMediaSchema),
  checkRole(["OWNER"]),
  checkAcademyExists,
  isAcademyOwnerMiddleware,
  controller.addSocialMediaAcademy,
);

router.delete(
  "/:academyId/social-media/:platformId",
  validation(Schema.DeleteSocialMediaSchema),
  checkRole(["OWNER"]),
  checkAcademyExists,
  isAcademyOwnerMiddleware,
  controller.deleteSocialMediaAcademy,
);

router.get(
  "/:academyId",
  validation(Schema.GetAcademySchema),
  checkAcademyExists,
  controller.getDetailsAcademy,
);

router.patch(
  "/:academyId",
  validation(Schema.UpdateAcademySchema),
  checkRole(["OWNER"]),
  checkAcademyExists,
  isAcademyOwnerMiddleware,
  controller.updateAcademy,
);

router.delete(
  "/:academyId",
  validation(Schema.DeleteAcademySchema),
  checkRole(["OWNER"]),
  checkAcademyExists,
  isAcademyOwnerMiddleware,
  controller.deleteAcademy,
);

router.use("/:academyId/clients", checkAcademyExists, routerClient);

router.use("/:academyId/courses", checkAcademyExists, routerCourse);

router.use("/:academyId/subscriptions", checkAcademyExists, routerSubscription);

router.use("/:academyId/transactions", checkAcademyExists, routerTransactions);

router.use("/:academyId/lessons", checkAcademyExists, routerLesson);

router.use("/:academyId/ledgers", checkAcademyExists, routerLedger);

export default router;
