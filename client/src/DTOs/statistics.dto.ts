import type { GetDashboardAnalyticsSchema } from "@/validations/statistics.validation";
import type z from "zod";

export type GetDashboardAnalyticsDto = z.infer<typeof GetDashboardAnalyticsSchema>;