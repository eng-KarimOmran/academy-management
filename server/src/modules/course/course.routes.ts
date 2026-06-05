import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./course.schema";
import * as controller from "./course.controller";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validation(Schema.GetAllSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getAllCourses,
);

router.post(
  "/",
  validation(Schema.CreateSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.createCourse,
);

router.post(
  "/:courseId/feature",
  validation(Schema.AddCourseFeaturesSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.addCourseFeatures,
);

router.delete(
  "/:courseId/feature/:featureId",
  validation(Schema.DeleteCourseFeaturesSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.deleteCourseFeatures,
);

router.get(
  "/:courseId",
  validation(Schema.GetDetailsSchema),
  controller.getDetailsCourse,
);

router.patch(
  "/:courseId",
  validation(Schema.UpdateSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.updateCourse,
);

router.delete(
  "/:courseId",
  validation(Schema.DeleteSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.deleteCourse,
);

export default router;
