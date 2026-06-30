import z from "zod";
import { date, id } from "../lib/common.validation";

export const GetDashboardAnalyticsSchema = {
    params: z.object({ academyId: id }),
    query: z.object({ startDate: date, endDate: date }),
}