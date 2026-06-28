import { Router } from "express";
import SubscriptionController from "./subscription.controller";
import * as Schema from "./subscription.schema";
import validate from "../../shared/middlewares/validate.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validate(Schema.CreateSubscriptionSchema),
  SubscriptionController.createSubscription
);

router.get(
  "/",
  validate(Schema.GetAllSubscriptionsSchema),
  SubscriptionController.getAllSubscriptions
);

router.get(
  "/:subscriptionId",
  validate(Schema.GetSubscriptionDetailsSchema),
  SubscriptionController.getSubscriptionDetails
);

router.patch(
  "/:subscriptionId/cancel",
  validate(Schema.CancelSubscriptionSchema),
  SubscriptionController.cancelSubscription
);

router.delete(
  "/:subscriptionId",
  validate(Schema.DeleteSubscriptionSchema),
  SubscriptionController.deleteSubscription
);

export default router;