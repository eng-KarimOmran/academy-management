import z from "zod";
import * as Schema from "./lesson.schema";

export type CreateLessonDto = {
  params: z.infer<typeof Schema.CreateLessonSchema.params>;
  body: z.infer<typeof Schema.CreateLessonSchema.body>;
};

export type GetAllLessonsDto = {
  params: z.infer<typeof Schema.GetAllLessonsSchema.params>;
  query: z.infer<typeof Schema.GetAllLessonsSchema.query>;
};

export type GetLessonDetailsDto = {
  params: z.infer<typeof Schema.GetLessonDetailsSchema.params>;
};

export type ChangeLessonStateDto = {
  params: z.infer<typeof Schema.ChangeLessonState.params>;
  body: z.infer<typeof Schema.ChangeLessonState.body>;
};