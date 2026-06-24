import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import * as Schema from "./lesson.schema";
import controller from "./lesson.controller";
import checkRole from "../../shared/middlewares/role.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validation(Schema.CreateLessonSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  controller.createLesson,
);

router.get(
  "/",
  validation(Schema.GetAllLessonsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  controller.getAllLessons,
);

router.get(
  "/:lessonId",
  validation(Schema.GetLessonDetailsSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  controller.getLessonDetails,
);

router.patch(
  "/:lessonId/status",
  validation(Schema.ChangeLessonStateSchema),
  checkRole(["OWNER", "CAPTAIN", "SECRETARY", "MANAGER"]),
  controller.changeLessonState,
);

router.patch(
  "/:lessonId",
  validation(Schema.UpdateLessonSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  controller.updateLesson,
);

export default router;