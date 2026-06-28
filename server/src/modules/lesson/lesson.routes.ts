import { Router } from "express";
import * as Schema from "./lesson.schema";
import controller from "./lesson.controller";
import { checkAcademyExists } from "../academy/academy.middleware";
import validate from "../../shared/middlewares/validate.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validate(Schema.CreateLessonSchema),
  controller.createLesson,
);

router.get(
  "/",
  validate(Schema.GetAllLessonsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  controller.getAllLessons,
);

router.get(
  "/:lessonId",
  validate(Schema.GetLessonDetailsSchema),
  controller.getLessonDetails,
);

router.patch(
  "/:lessonId/status",
  validate(Schema.ChangeLessonStateSchema),
  controller.changeLessonState,
);

router.patch(
  "/:lessonId",
  validate(Schema.UpdateLessonSchema),
  controller.updateLesson,
);

export default router;