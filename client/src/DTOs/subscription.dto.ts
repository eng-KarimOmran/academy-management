import z from "zod";
import * as Schema from "../validations/subscription.validation";

export type CreateSubscriptionDto = z.infer<
  typeof Schema.CreateSubscriptionSchema
>;

export type GetAllSubscriptionsDto = z.infer<
  typeof Schema.GetAllSubscriptionsSchema
>;

export type GetSubscriptionDetailsDto = z.infer<
  typeof Schema.GetSubscriptionDetailsSchema
>;

export type DeleteSubscriptionDto = z.infer<
  typeof Schema.DeleteSubscriptionSchema
>;

export type CancelSubscriptionDto = z.infer<
  typeof Schema.CancelSubscriptionSchema
>;
