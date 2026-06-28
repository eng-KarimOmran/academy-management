import { Router } from "express";
import SubscriptionController from "./subscription.controller";
import * as Schema from "./subscription.schema";
import validate from "../../shared/middlewares/validate.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validate(Schema.CreateSubscriptionSchema),
  checkAcademyExists(),
  SubscriptionController.createSubscription
);

router.get(
  "/:subscriptionId",
  validate(Schema.GetSubscriptionDetailsSchema),
  checkAcademyExists(),
  SubscriptionController.getSubscriptionDetails
);

router.use(checkAcademyExists({ isAcademyOwner: true }))

router.get(
  "/",
  validate(Schema.GetAllSubscriptionsSchema),
  SubscriptionController.getAllSubscriptions
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