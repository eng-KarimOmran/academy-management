import z from "zod";

import {
  limit,
  positiveNumber,
  phone,
  transmission,
  cancelReason,
  id,
} from "@/validations/common.validation";

export const CreateSubscriptionSchema = z.object({
  academyId: id,
  areaId: id,
  courseId: id,
  phone,
  trainingTypeAtRegistration: transmission,
});

export const GetAllSubscriptionsSchema = z.object({
  academyId: id,
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(10),
  search: z.string().optional(),
});

export const GetSubscriptionDetailsSchema = z.object({
  academyId: id,
  subscriptionId: id,
});

export const DeleteSubscriptionSchema = z.object({
  academyId: id,
  subscriptionId: id,
});

export const CancelSubscriptionSchema = z.object({
  academyId: id,
  subscriptionId: id,
  reason: cancelReason,
});
