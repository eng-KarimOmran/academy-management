import z from "zod";
import * as Schema from "@/validations/course.validation";

/**
 * CREATE
 */
export type CreateCourseDto = z.infer<typeof Schema.CreateCourseSchema>;

/**
 * UPDATE
 */
export type UpdateCourseDto = z.infer<typeof Schema.UpdateCourseSchema>;

/**
 * DELETE
 */
export type DeleteCourseDto = z.infer<typeof Schema.DeleteCourseSchema>;

/**
 * GET ALL
 */
export type GetAllCoursesDto = z.infer<typeof Schema.GetAllCoursesSchema>;

/**
 * GET DETAILS
 */
export type GetCourseDetailsDto = z.infer<typeof Schema.GetCourseDetailsSchema>;

/**
 * FILTER (optional)
 */
export type FilterCoursesDto = z.infer<typeof Schema.FilterCoursesSchema>;
