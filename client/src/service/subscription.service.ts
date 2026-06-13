import { axiosClient } from "@/lib/axios";

import type {
  CreateSubscriptionDto,
  GetAllSubscriptionsDto,
  GetSubscriptionDetailsDto,
  DeleteSubscriptionDto,
  CancelSubscriptionDto,
} from "@/DTOs/subscription.dto";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type {
  SubscriptionDetails,
  SubscriptionBase,
} from "@/types/subscription";

const baseUrl = (academyId: string) => `/academies/${academyId}/subscriptions`;

export const createSubscription = (data: CreateSubscriptionDto) => {
  const { academyId, ...body } = data;

  return axiosClient.post<SuccessfulResponse<SubscriptionBase>>(
    baseUrl(academyId),
    body,
  );
};

export const getAllSubscriptions = (data: GetAllSubscriptionsDto) => {
  const { academyId } = data;

  return axiosClient.get<PaginatedResponse<SubscriptionBase>>(
    baseUrl(academyId),
    {
      params: {
        page: data.page ?? 1,
        limit: data.limit ?? 10,
        search: data.search ?? "",
      },
    },
  );
};

export const getSubscriptionDetails = (params: GetSubscriptionDetailsDto) => {
  const { academyId, subscriptionId } = params;

  return axiosClient.get<SuccessfulResponse<SubscriptionDetails>>(
    `${baseUrl(academyId)}/${subscriptionId}`,
  );
};

export const deleteSubscription = (data: DeleteSubscriptionDto) => {
  const { academyId, subscriptionId } = data;
  return axiosClient.delete<SuccessfulResponse<null>>(
    `${baseUrl(academyId)}/${subscriptionId}`,
  );
};

export const cancelSubscription = (data: CancelSubscriptionDto) => {
  const { academyId, subscriptionId, ...body } = data;

  return axiosClient.post<SuccessfulResponse<SubscriptionBase>>(
    `${baseUrl(academyId)}/${subscriptionId}/cancel`,
    body,
  );
};
