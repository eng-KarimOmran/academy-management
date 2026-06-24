import type z from "zod";
import * as Schema from "@/validations/statistics.validation";

export type GetDashboardAnalyticsDto = {
    params: z.infer<typeof Schema.GetDashboardAnalyticsSchema.params>
    query: z.infer<typeof Schema.GetDashboardAnalyticsSchema.query>
}