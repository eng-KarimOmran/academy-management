import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./subscription.schema";
import * as controller from "./subscription.controller";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validation(Schema.CreateSubscriptionSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.createSubscription,
);

router.get(
  "/",
  validation(Schema.GetAllSubscriptionsSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.getAllSubscriptions,
);

router.post(
  "/cancel/:subscriptionId",
  validation(Schema.CancelSubscriptionSchema),
  checkRole(["OWNER"]),
  controller.cancelSubscription,
);

router.get(
  "/:subscriptionId",
  validation(Schema.GetSubscriptionDetailsSchema),
  checkRole(["OWNER"]),
  controller.getSubscriptionDetails,
);

router.delete(
  "/:subscriptionId",
  validation(Schema.DeleteSubscriptionSchema),
  checkRole(["OWNER"]),
  controller.deleteSubscription,
);

export default router;