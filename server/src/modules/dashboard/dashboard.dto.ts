import { z } from "zod";
import { GetDashboardAnalyticsSchema } from "./dashboard.schema";

export type GetDashboardAnalyticsDto = {
    params: z.infer<typeof GetDashboardAnalyticsSchema.params>
    query: z.infer<typeof GetDashboardAnalyticsSchema.query>
}