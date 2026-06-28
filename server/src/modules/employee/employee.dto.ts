import z from "zod";
import * as Schema from "./employee.schema"

export type GetMyLessonsDto = {
    query: z.infer<typeof Schema.GetMyLessonsSchema.query>;
}

export type GetDashboardManagerDto = {
    params: z.infer<typeof Schema.GetDashboardManagerSchema.params>
    query: z.infer<typeof Schema.GetDashboardManagerSchema.query>;
}