import { checkAcademyExists } from './../academy/academy.middleware';
import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import * as Schema from "./captain.schema";
import CaptainController from "./captain.controller";
import checkRole from "../../shared/middlewares/role.middleware";


const router = Router({ mergeParams: true });


router.get(
  "/",
  validation(Schema.GetAllCaptainsSchema),
  checkRole(["OWNER", "MANAGER", "SECRETARY"]),
  CaptainController.getAllCaptains,
);

router.post(
  "/",
  validation(Schema.CreateCaptainSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  CaptainController.createCaptain,
);

router.get(
  "/:captainId",
  validation(Schema.GetCaptainDetailsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  CaptainController.getDetailsCaptain,
);

router.patch(
  "/:captainId",
  validation(Schema.UpdateCaptainSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  CaptainController.updateCaptain,
);

router.delete(
  "/:captainId",
  validation(Schema.DeleteCaptainSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  CaptainController.deleteCaptain,
);

export default router;