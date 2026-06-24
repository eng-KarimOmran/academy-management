import z from "zod";
import * as Schema from "../validations/captain.validation";

export type CreateDto = {
  params: z.infer<typeof Schema.CreateCaptainSchema.params>;
  body: z.infer<typeof Schema.CreateCaptainSchema.body>;
};

export type UpdateDto = {
  params: z.infer<typeof Schema.UpdateCaptainSchema.params>;
  body: z.infer<typeof Schema.UpdateCaptainSchema.body>;
};

export type GetAllDto = {
  params: z.infer<typeof Schema.GetAllCaptainsSchema.params>;
  query: z.infer<typeof Schema.GetAllCaptainsSchema.query>;
};

export type GetDetailsDto = {
  params: z.infer<typeof Schema.GetCaptainDetailsSchema.params>;
};

export type DeleteDto = {
  params: z.infer<typeof Schema.DeleteCaptainSchema.params>;
};

export type GetLessonCaptainDto = {
  params: z.infer<typeof Schema.GetLessonCaptainSchema.params>;
  query: z.infer<typeof Schema.GetLessonCaptainSchema.query>;
};
