import { z } from "zod";
import { date, id } from "../../shared/utils/common.validation"

export const GetDashboardAnalyticsSchema = {
    params: z.object({ academyId: id }),
    query: z.object({ startDate: date.optional(), endDate: date.optional() }),
}