import { Router } from "express";
import SubscriptionController from "./subscription.controller";
import * as Schema from "./subscription.schema";
import validate from "../../shared/middlewares/validate.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validate(Schema.CreateSubscriptionSchema),
  SubscriptionController.createSubscription
);

router.get(
  "/:subscriptionId",
  validate(Schema.GetSubscriptionDetailsSchema),
  SubscriptionController.getSubscriptionDetails
);

router.get(
  "/",
  validate(Schema.GetAllSubscriptionsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  SubscriptionController.getAllSubscriptions
);

router.patch(
  "/:subscriptionId/cancel",
  validate(Schema.CancelSubscriptionSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  SubscriptionController.cancelSubscription
);

router.delete(
  "/:subscriptionId",
  validate(Schema.DeleteSubscriptionSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  SubscriptionController.deleteSubscription
);

export default router;