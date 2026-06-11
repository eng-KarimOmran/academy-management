import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./course.schema";
import CourseController from "./course.controller";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validation(Schema.GetAllSchema),
  checkRole(["OWNER", "SECRETARY"]),
  CourseController.getAllCourses,
);

router.post(
  "/",
  validation(Schema.CreateSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  CourseController.createCourse,
);

router.post(
  "/:courseId/feature",
  validation(Schema.AddCourseFeaturesSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  CourseController.addCourseFeatures,
);

router.delete(
  "/:courseId/feature/:featureId",
  validation(Schema.DeleteCourseFeaturesSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  CourseController.deleteCourseFeatures,
);

router.get(
  "/:courseId",
  validation(Schema.GetDetailsSchema),
  CourseController.getDetailsCourse,
);

router.patch(
  "/:courseId",
  validation(Schema.UpdateSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  CourseController.updateCourse,
);

router.delete(
  "/:courseId",
  validation(Schema.DeleteSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  CourseController.deleteCourse,
);

export default router;