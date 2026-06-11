import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./subscription.schema";
import SubscriptionController from "./subscription.controller";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validation(Schema.CreateSubscriptionSchema),
  checkRole(["OWNER", "SECRETARY"]),
  SubscriptionController.createSubscription,
);

router.get(
  "/",
  validation(Schema.GetAllSubscriptionsSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  SubscriptionController.getAllSubscriptions,
);

router.post(
  "/:subscriptionId/cancel",
  validation(Schema.CancelSubscriptionSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  SubscriptionController.cancelSubscription,
);

router.get(
  "/:subscriptionId",
  validation(Schema.GetSubscriptionDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  SubscriptionController.getSubscriptionDetails,
);

router.delete(
  "/:subscriptionId",
  validation(Schema.DeleteSubscriptionSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  SubscriptionController.deleteSubscription,
);

export default router;