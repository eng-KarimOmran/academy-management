import z from "zod";
import * as Schema from "../validations/lesson.validation";

// ================== CREATE ==================
export type CreateLessonDto = z.infer<typeof Schema.CreateLessonSchema>;

// ================== GET ALL ==================
export type GetAllLessonsDto = z.infer<typeof Schema.GetAllLessonsSchema>;

// ================== DETAILS ==================
export type GetLessonDetailsDto = z.infer<typeof Schema.GetLessonDetailsSchema>;

// ================== CHANGE STATUS ==================
export type ChangeLessonStateDto = z.infer<
  typeof Schema.ChangeLessonStateSchema
>;