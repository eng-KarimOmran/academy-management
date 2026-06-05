import z from "zod";
import * as Schema from "../validations/area.validation";

export type CreateAreaDto = z.infer<typeof Schema.CreateAreaSchema>;

export type UpdateAreaDto = z.infer<typeof Schema.UpdateAreaSchema>;

export type DeleteAreaDto = z.infer<typeof Schema.DeleteAreaSchema>;

export type GetAllAreasDto = z.infer<typeof Schema.GetAllAreasSchema>;

export type GetAreaActiveDto = z.infer<typeof Schema.FilterAreasSchema>;
