import z from "zod";
import { date, id } from "../../shared/utils/common.validation";

export const GetMyLessonsSchema = {
    query: z.object({ startDate: date, endDate: date }),
}

export const GetDashboardManagerSchema = {
    params: z.object({
        academyId: id,
    }),
    query: z.object({
        startDate: date,
        endDate: date,
    }),
};