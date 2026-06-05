import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./captain.schema";
import * as controller from "./captain.controller";
import checkRole from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllCaptainsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getAllCaptains,
);

router.post(
  "/",
  validation(Schema.CreateCaptainSchema),
  checkRole(["OWNER"]),
  controller.createCaptain,
);

router.get(
  "/:captainId",
  validation(Schema.GetCaptainDetailsSchema),
  checkRole(["OWNER", "CAPTAIN"]),
  controller.getDetailsCaptain,
);

router.patch(
  "/:captainId",
  validation(Schema.UpdateCaptainSchema),
  checkRole(["OWNER"]),
  controller.updateCaptain,
);

router.delete(
  "/:captainId",
  validation(Schema.DeleteCaptainSchema),
  checkRole(["OWNER"]),
  controller.deleteCaptain,
);

export default router;