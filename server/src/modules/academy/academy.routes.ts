import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import AcademyController from "./academy.controller";
import { checkAcademyExists } from "./academy.middleware";
import { AcademySchema } from "./academy.Schema";
import { isAdmin } from './../user/user.middleware';

// import routerCourse from "../course/course.routes";
// import routerClient from "../client/client.routes";
// import routerSubscription from "../subscription/subscription.routes";
// import routerTransactions from "../ledgerTransaction/ledgerTransaction.routes";
// import routerLesson from "../lesson/lesson.routes";
// import routerStatistics from "../dashboard/dashboard.routes";
// import routerCaptain from "../captain/captain.routes";
// import routerSecretary from "../secretary/secretary.routes";
// import routerAccount from "../account/account.routes";
// import routerArea from "../area/area.routes";
// import routerCar from "../car/car.routes";

const router = Router();

// =======================
// General Academy Routes
// =======================
router.get(
  "/",
  validation(AcademySchema.getAll),
  AcademyController.getAll
);

router.get(
  "/my-academics",
  AcademyController.myAcademics
);

router.post(
  "/",
  validation(AcademySchema.create),
  isAdmin,
  AcademyController.create
);

// =======================
// Owners Routes
// =======================
router.post(
  "/:academyId/owner/:userId",
  validation(AcademySchema.owner.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addOwner
);

router.delete(
  "/:academyId/owner/:userId",
  validation(AcademySchema.owner.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deleteOwner
);

// =======================
// Social Media Routes
// =======================
router.post(
  "/:academyId/social-media",
  validation(AcademySchema.socialMedia.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addSocialMedia
);

router.delete(
  "/:academyId/social-media/:socialMediaId",
  validation(AcademySchema.socialMedia.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deleteSocialMedia
);

// =======================
// Phone Routes
// =======================
router.post(
  "/:academyId/phone",
  validation(AcademySchema.phone.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addPhone
);

router.delete(
  "/:academyId/phone/:phoneId",
  validation(AcademySchema.phone.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deletePhone
);

// =======================
// Address Routes 
// =======================
router.post(
  "/:academyId/address",
  validation(AcademySchema.address.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addAddress
);

router.delete(
  "/:academyId/address/:addressId",
  validation(AcademySchema.address.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deleteAddress
);

// =======================
// Payment Link Routes
// =======================
router.post(
  "/:academyId/payment-link",
  validation(AcademySchema.paymentLink.add),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.addPaymentLink
);

router.delete(
  "/:academyId/payment-link/:paymentLinkId",
  validation(AcademySchema.paymentLink.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.deletePaymentLink
);

// =======================
// Academy Core By ID
// =======================
router.get(
  "/:academyId",
  validation(AcademySchema.get),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.getDetails
);

router.patch(
  "/:academyId",
  validation(AcademySchema.update),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.update
);

router.delete(
  "/:academyId",
  validation(AcademySchema.delete),
  checkAcademyExists({ isAcademyOwner: true }),
  AcademyController.delete
);

// =======================
// Nested Routes Sub-router
// =======================
router.use("/:academyId", checkAcademyExists());

// router.use("/:academyId/clients", routerClient);
// router.use("/:academyId/courses", routerCourse);
// router.use("/:academyId/subscriptions", routerSubscription);
// router.use("/:academyId/transactions", routerTransactions);
// router.use("/:academyId/lessons", routerLesson);
// router.use("/:academyId/statistics", routerStatistics);
// router.use("/:academyId/captains", routerCaptain);
// router.use("/:academyId/secretaries", routerSecretary);
// router.use("/:academyId/accounts", routerAccount);
// router.use("/:academyId/cars", routerCar);
// router.use("/:academyId/areas", routerArea);

export default router;