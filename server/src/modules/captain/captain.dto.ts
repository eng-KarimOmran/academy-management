import z from "zod";

import {
  CreateCaptainSchema,
  UpdateCaptainSchema,
  GetAllCaptainsSchema,
  GetCaptainDetailsSchema,
  DeleteCaptainSchema,
  GetLessonCaptainSchema,
} from "./captain.schema";

export type CreateDto = {
  body: z.infer<typeof CreateCaptainSchema.body>;
};

export type UpdateDto = {
  params: z.infer<typeof UpdateCaptainSchema.params>;
  body: z.infer<typeof UpdateCaptainSchema.body>;
};

export type GetAllDto = {
  query: z.infer<typeof GetAllCaptainsSchema.query>;
};

export type GetDetailsDto = {
  params: z.infer<typeof GetCaptainDetailsSchema.params>;
};

export type DeleteDto = {
  params: z.infer<typeof DeleteCaptainSchema.params>;
};

export type GetLessonCaptainDto = {
  params: z.infer<typeof GetLessonCaptainSchema.params>;
  query: z.infer<typeof GetLessonCaptainSchema.query>;
};
