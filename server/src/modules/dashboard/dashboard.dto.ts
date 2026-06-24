import { z } from "zod";
import * as Schema from "./dashboard.schema";

export type GetDashboardAnalyticsDto = {
    params: z.infer<typeof Schema.GetDashboardAnalyticsSchema.params>
    query: z.infer<typeof Schema.GetDashboardAnalyticsSchema.query>
}