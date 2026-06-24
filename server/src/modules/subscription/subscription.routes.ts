import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import * as Schema from "./subscription.schema";
import SubscriptionController from "./subscription.controller";
import checkRole from "../../shared/middlewares/role.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validation(Schema.CreateSubscriptionSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  SubscriptionController.createSubscription,
);

router.get(
  "/",
  validation(Schema.GetAllSubscriptionsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  SubscriptionController.getAllSubscriptions,
);

router.post(
  "/:subscriptionId/cancel",
  validation(Schema.CancelSubscriptionSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  SubscriptionController.cancelSubscription,
);

router.get(
  "/:subscriptionId",
  validation(Schema.GetSubscriptionDetailsSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  SubscriptionController.getSubscriptionDetails,
);

router.delete(
  "/:subscriptionId",
  validation(Schema.DeleteSubscriptionSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  SubscriptionController.deleteSubscription,
);

export default router;