import z from "zod";
import * as Schema from "@/validations/course.validation";

export type CreateCourseDto = z.infer<typeof Schema.CreateSchema>;

export type UpdateCourseDto = z.infer<typeof Schema.UpdateSchema>;

export type DeleteCourseDto = z.infer<typeof Schema.DeleteSchema>;

export type GetAllCoursesDto = z.infer<typeof Schema.GetAllSchema>;

export type GetCourseDetailsDto = z.infer<typeof Schema.GetDetailsSchema>;

export type AddCourseFeaturesDto = z.infer<
  typeof Schema.AddCourseFeaturesSchema
>;

export type DeleteCourseFeaturesDto = z.infer<
  typeof Schema.DeleteCourseFeaturesSchema
>;