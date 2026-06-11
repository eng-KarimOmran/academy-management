import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./captain.schema";
import CaptainController from "./captain.controller";
import checkRole from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllCaptainsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  CaptainController.getAllCaptains,
);

router.get(
  "/:userId/lessons",
  validation(Schema.GetLessonCaptainSchema),
  checkRole(["OWNER", "CAPTAIN"]),
  CaptainController.getLessonsCaptain,
);

router.post(
  "/",
  validation(Schema.CreateCaptainSchema),
  checkRole(["OWNER"]),
  CaptainController.createCaptain,
);

router.get(
  "/:captainId",
  validation(Schema.GetCaptainDetailsSchema),
  checkRole(["OWNER", "CAPTAIN"]),
  CaptainController.getDetailsCaptain,
);

router.patch(
  "/:captainId",
  validation(Schema.UpdateCaptainSchema),
  checkRole(["OWNER"]),
  CaptainController.updateCaptain,
);

router.delete(
  "/:captainId",
  validation(Schema.DeleteCaptainSchema),
  checkRole(["OWNER"]),
  CaptainController.deleteCaptain,
);

export default router;