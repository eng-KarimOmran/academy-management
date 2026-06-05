import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./lesson.schema";
import * as controller from "./lesson.controller";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validation(Schema.CreateLessonSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.createLesson,
);

router.get(
  "/",
  validation(Schema.GetAllLessonsSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.getAllLessons,
);

router.get(
  "/:lessonId",
  validation(Schema.GetLessonDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getLessonDetails,
);

router.patch(
  "/:lessonId/status",
  validation(Schema.ChangeLessonState),
  checkRole(["OWNER", "SECRETARY", "CAPTAIN"]),
  controller.changeLessonState,
);

export default router;