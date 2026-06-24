import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import checkRole from "../../shared/middlewares/role.middleware";
import AcademyController from "./academy.controller";
import { checkAcademyExists } from "./academy.middleware";

import routerCourse from "../course/course.routes";
import routerClient from "../client/client.routes";
import routerSubscription from "../subscription/subscription.routes";
import routerTransactions from "../ledgerTransaction/ledgerTransaction.routes";
import routerLesson from "../lesson/lesson.routes";
import routerStatistics from "../dashboard/dashboard.routes";
import routerCaptain from "../captain/captain.routes";
import routerSecretary from "../secretary/secretary.routes";
import routerAccount from "../account/account.routes";
import { AcademySchema } from "./academy.Schema";

const router = Router();

router.get(
  "/",
  validation(AcademySchema.getAll),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  AcademyController.getAllAcademy
);

router.get(
  "/my-academics",
  checkRole(["OWNER"]),
  AcademyController.getMyAcademics
);

router.post(
  "/",
  validation(AcademySchema.create),
  checkRole(["OWNER"]),
  AcademyController.createAcademy
);

router.use("/:academyId", checkAcademyExists());

router.post(
  "/:academyId/owner/:userId",
  validation(AcademySchema.owner.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addOwnerAcademy
);

router.delete(
  "/:academyId/owner/:userId",
  validation(AcademySchema.owner.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deleteOwnerAcademy
);

router.post(
  "/:academyId/social-media",
  validation(AcademySchema.socialMedia.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addSocialMediaAcademy
);

router.delete(
  "/:academyId/social-media/:socialMediaId",
  validation(AcademySchema.socialMedia.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deleteSocialMediaAcademy
);

router.get(
  "/:academyId",
  validation(AcademySchema.get),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.getDetailsAcademy
);

router.patch(
  "/:academyId",
  validation(AcademySchema.update),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.updateAcademy
);

router.delete(
  "/:academyId",
  validation(AcademySchema.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deleteAcademy
);

router.use("/:academyId/clients", routerClient);
router.use("/:academyId/courses", routerCourse);
router.use("/:academyId/subscriptions", routerSubscription);
router.use("/:academyId/transactions", routerTransactions);
router.use("/:academyId/lessons", routerLesson);
router.use("/:academyId/statistics", routerStatistics);
router.use("/:academyId/captains", routerCaptain);
router.use("/:academyId/secretaries", routerSecretary);
router.use("/:academyId/accounts", routerAccount);

export default router;