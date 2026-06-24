import { axiosClient } from "@/lib/axios";
import * as Dto from "@/DTOs/subscription.dto";

import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type {
  SubscriptionDetails,
  SubscriptionBase,
} from "@/types/subscription";

type Entity = SubscriptionBase;
type EntityDetails = SubscriptionDetails;

const subscriptionsUrl = {
  base: (academyId: string) =>
    `/academies/${academyId}/subscriptions`,

  byId: (academyId: string, subscriptionId: string) =>
    `/academies/${academyId}/subscriptions/${subscriptionId}`,

  cancel: (academyId: string, subscriptionId: string) =>
    `/academies/${academyId}/subscriptions/${subscriptionId}/cancel`,
};

export const createSubscription = (data: Dto.CreateSubscriptionDto) => {
  const { params, body } = data;
  const { academyId } = params;

  return axiosClient.post<SuccessfulResponse<Entity>>(
    subscriptionsUrl.base(academyId),
    body
  );
};

export const getAllSubscriptions = (data: Dto.GetAllSubscriptionsDto) => {
  const { params, query } = data;
  const { academyId } = params;

  return axiosClient.get<PaginatedResponse<Entity>>(
    subscriptionsUrl.base(academyId),
    {
      params: query,
    }
  );
};

export const getSubscriptionDetails = (
  data: Dto.GetSubscriptionDetailsDto
) => {
  const { params } = data;
  const { academyId, subscriptionId } = params;

  return axiosClient.get<SuccessfulResponse<EntityDetails>>(
    subscriptionsUrl.byId(academyId, subscriptionId)
  );
};

export const deleteSubscription = (
  data: Dto.DeleteSubscriptionDto
) => {
  const { params } = data;
  const { academyId, subscriptionId } = params;

  return axiosClient.delete<SuccessfulResponse<null>>(
    subscriptionsUrl.byId(academyId, subscriptionId)
  );
};

export const cancelSubscription = (
  data: Dto.CancelSubscriptionDto
) => {
  const { params } = data;
  const { academyId, subscriptionId } = params;

  return axiosClient.post<SuccessfulResponse<Entity>>(subscriptionsUrl.cancel(academyId, subscriptionId));
};