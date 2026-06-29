import { axiosClient } from "@/lib/axios";
import * as Dto from "@/DTOs/statistics.dto";

import type { SuccessfulResponse } from "@/types/axios";
import type { DashboardStatistics } from "@/types/statistics";

type Entity = DashboardStatistics;

const statisticsUrl = {
    base: (academyId: string) => `/academies/${academyId}/statistic`,
};

export const getDashboardAnalytics = (
    data: Dto.GetDashboardAnalyticsDto
) => {
    const { params, query } = data;
    const { academyId } = params;

    return axiosClient.get<SuccessfulResponse<Entity>>(statisticsUrl.base(academyId), { params: query });
};