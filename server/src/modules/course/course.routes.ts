import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import * as Schema from "./course.schema";
import CourseController from "./course.controller";
import checkRole from "../../shared/middlewares/role.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validation(Schema.GetAllSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  CourseController.getAllCourses,
);

router.post(
  "/",
  validation(Schema.CreateSchema),
  checkRole(["OWNER"]),
  checkAcademyExists({ isAcademyOwner: true }),
  CourseController.createCourse,
);

router.post(
  "/:courseId/feature",
  validation(Schema.AddCourseFeaturesSchema),
  checkRole(["OWNER"]),
  checkAcademyExists({ isAcademyOwner: true }),
  CourseController.addCourseFeatures,
);

router.delete(
  "/:courseId/feature/:featureId",
  validation(Schema.DeleteCourseFeaturesSchema),
  checkRole(["OWNER"]),
  checkAcademyExists({ isAcademyOwner: true }),
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
  checkAcademyExists({ isAcademyOwner: true }),
  CourseController.updateCourse,
);

router.delete(
  "/:courseId",
  validation(Schema.DeleteSchema),
  checkRole(["OWNER"]),
  checkAcademyExists({ isAcademyOwner: true }),
  CourseController.deleteCourse,
);

export default router;