import z from "zod";
import * as Schema from "../validations/captain.validation";

export type CreateCaptainDto = z.infer<typeof Schema.CreateCaptainSchema>;

export type UpdateCaptainDto = z.infer<typeof Schema.UpdateCaptainSchema>;

export type GetAllCaptainsDto = z.infer<typeof Schema.GetAllCaptainsSchema>;

export type GetCaptainDetailsDto = z.infer<
  typeof Schema.GetCaptainDetailsSchema
>;

export type DeleteCaptainDto = z.infer<typeof Schema.DeleteCaptainSchema>;

export type FilterCaptainsDto = z.infer<typeof Schema.FilterCaptainsSchema>;

export type GetCaptainScheduleDto = z.infer<
  typeof Schema.GetCaptainScheduleSchema
>;

export type GetLessonCaptainDto = z.infer<typeof Schema.GetLessonCaptainSchema>;