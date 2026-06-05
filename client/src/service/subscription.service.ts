import { axiosClient } from "@/lib/axios";

import type {
  CreateSubscriptionDto,
  GetAllSubscriptionsDto,
  GetSubscriptionDetailsDto,
  DeleteSubscriptionDto,
  CancelSubscriptionDto,
} from "@/DTOs/subscription.dto";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Subscription } from "@/types/subscription";

export const createSubscription = (data: CreateSubscriptionDto) => {
  const { academyId, ...body } = data;

  return axiosClient.post<SuccessfulResponse<Subscription>>(
    `/academy/${academyId}/subscription`,
    body,
  );
};

export const getAllSubscriptions = (params: GetAllSubscriptionsDto) => {
  const { academyId, ...query } = params;

  return axiosClient.get<PaginatedResponse<Subscription>>(
    `/academy/${academyId}/subscription`,
    {
      params: query,
    },
  );
};

export const getSubscriptionDetails = (params: GetSubscriptionDetailsDto) => {
  const { academyId, subscriptionId } = params;

  return axiosClient.get<SuccessfulResponse<Subscription>>(
    `/academy/${academyId}/subscription/details/${subscriptionId}`,
  );
};

export const deleteSubscription = (data: DeleteSubscriptionDto) => {
  const { academyId, subscriptionId } = data;
  return axiosClient.delete<SuccessfulResponse<null>>(
    `/academy/${academyId}/subscription/${subscriptionId}`,
  );
};

export const cancelSubscription = (data: CancelSubscriptionDto) => {
  const { academyId, subscriptionId, ...body } = data;

  return axiosClient.post(
    `/academy/${academyId}/subscription/cancel/${subscriptionId}`,
    body,
  );
};
