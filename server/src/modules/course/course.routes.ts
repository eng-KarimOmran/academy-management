import { Router } from "express";
import CourseController from "./course.controller";
import * as Schema from "./course.schema";
import validate from "../../shared/middlewares/validate.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validate(Schema.GetAllSchema),
  checkAcademyExists(),
  CourseController.getAllCourses
);

router.use(checkAcademyExists({ isAcademyOwner: true }))

router.post(
  "/",
  validate(Schema.CreateSchema),
  CourseController.createCourse
);

router.get(
  "/:courseId",
  validate(Schema.GetDetailsSchema),
  CourseController.getCourseDetails
);

router.patch(
  "/:courseId",
  validate(Schema.UpdateSchema),
  CourseController.updateCourse
);

router.delete(
  "/:courseId",
  validate(Schema.DeleteSchema),
  CourseController.deleteCourse
);

router.post(
  "/:courseId/features",
  validate(Schema.AddCourseFeaturesSchema),
  CourseController.addCourseFeature
);

router.delete(
  "/:courseId/features/:featureId",
  validate(Schema.DeleteCourseFeaturesSchema),
  CourseController.deleteCourseFeature
);

export default router;