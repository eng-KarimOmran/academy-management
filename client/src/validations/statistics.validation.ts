import z from "zod";
import { id } from "./common.validation";

export const GetDashboardAnalyticsSchema = z.object({
    academyId: id,
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

export const AnalyticsSchema = z.object({
    startDate: z.string().min(2, "التاريخ مطلوب"),
    endDate: z.string().min(2, "التاريخ مطلوب"),
});