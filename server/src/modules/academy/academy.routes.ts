import { Router } from "express";
import validate from "../../shared/middlewares/validate.middleware";
import AcademyController from "./academy.controller";
import { checkAcademyExists } from "./academy.middleware";
import { AcademySchema } from "./academy.Schema";
import { isAdmin } from '../user/user.middleware';

import routerJobProfile from "../jobProfile/jobProfile.routes";
import routerClient from "../client/client.routes";

// import routerCourse from "../course/course.routes";
// import routerSubscription from "../subscription/subscription.routes";
// import routerTransactions from "../ledgerTransaction/ledgerTransaction.routes";
// import routerLesson from "../lesson/lesson.routes";
// import routerStatistics from "../dashboard/dashboard.routes";
// import routerAccount from "../account/account.routes";
// import routerArea from "../area/area.routes";
// import routerCar from "../car/car.routes";

const router = Router();

// =======================
// General Academy Routes
// =======================
router.get(
  "/",
  validate(AcademySchema.getAll),
  AcademyController.getAll
);

router.get(
  "/my-academics",
  AcademyController.myAcademics
);

router.post(
  "/",
  validate(AcademySchema.create),
  isAdmin,
  AcademyController.create
);

// =======================
// Owners Routes
// =======================
router.post(
  "/:academyId/owner/:userId",
  validate(AcademySchema.owner.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addOwner
);

router.delete(
  "/:academyId/owner/:userId",
  validate(AcademySchema.owner.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deleteOwner
);

// =======================
// Social Media Routes
// =======================
router.post(
  "/:academyId/social-media",
  validate(AcademySchema.socialMedia.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addSocialMedia
);

router.delete(
  "/:academyId/social-media/:socialMediaId",
  validate(AcademySchema.socialMedia.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deleteSocialMedia
);

// =======================
// Phone Routes
// =======================
router.post(
  "/:academyId/phone",
  validate(AcademySchema.phone.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addPhone
);

router.delete(
  "/:academyId/phone/:phoneId",
  validate(AcademySchema.phone.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deletePhone
);

// =======================
// Address Routes 
// =======================
router.post(
  "/:academyId/address",
  validate(AcademySchema.address.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addAddress
);

router.delete(
  "/:academyId/address/:addressId",
  validate(AcademySchema.address.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deleteAddress
);

// =======================
// Payment Link Routes
// =======================
router.post(
  "/:academyId/payment-link",
  validate(AcademySchema.paymentLink.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addPaymentLink
);

router.delete(
  "/:academyId/payment-link/:paymentLinkId",
  validate(AcademySchema.paymentLink.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deletePaymentLink
);

// =======================
// Academy Core By ID
// =======================
router.get(
  "/:academyId",
  validate(AcademySchema.get),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.getDetails
);

router.patch(
  "/:academyId",
  validate(AcademySchema.update),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.update
);

router.delete(
  "/:academyId",
  validate(AcademySchema.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.delete
);

// =======================
// Nested Routes Sub-router
// =======================

router.use(
  "/:academyId/job-profile",
  checkAcademyExists({ isAcademyOwner: true }),
  routerJobProfile
);

router.use(
  "/:academyId/client",
  checkAcademyExists(),
  routerClient
);

// router.use("/:academyId/courses", routerCourse);
// router.use("/:academyId/subscriptions", routerSubscription);
// router.use("/:academyId/transactions", routerTransactions);
// router.use("/:academyId/lessons", routerLesson);
// router.use("/:academyId/statistics", routerStatistics);
// router.use("/:academyId/secretaries", routerSecretary);
// router.use("/:academyId/accounts", routerAccount);
// router.use("/:academyId/cars", routerCar);
// router.use("/:academyId/areas", routerArea);

export default router;