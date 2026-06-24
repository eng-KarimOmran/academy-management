import z from "zod";

import {
  limit,
  positiveNumber,
  transmission,
  id,
  subscriptionStatus,
} from "@/validations/common.validation";

export const CreateSubscriptionSchema = {
  params: z.object({
    academyId: id,
  }),
  body: z.object({
    clientId: id,
    courseId: id,
    areaId: id,
    trainingTypeAtRegistration: transmission,
  }),
};

export const GetAllSubscriptionsSchema = {
  params: z.object({
    academyId: id,
  }),
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    search: z.string().optional(),
    status: subscriptionStatus.optional(),
  }),
};

export const GetSubscriptionDetailsSchema = {
  params: z.object({ subscriptionId: id, academyId: id }),
};

export const DeleteSubscriptionSchema = {
  params: z.object({
    subscriptionId: id,
    academyId: id,
  }),
};

export const CancelSubscriptionSchema = {
  params: z.object({
    academyId: id,
    subscriptionId: id,
  }),
};