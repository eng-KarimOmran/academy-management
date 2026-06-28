import { Router } from "express";
import AreaController from "./area.controller";
import * as Schema from "./area.schema";
import validate from "../../shared/middlewares/validate.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validate(Schema.GetAllAreasSchema),
  AreaController.getAllAreas
);


router.post(
  "/",
  validate(Schema.CreateAreaSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  AreaController.createArea
);

router.get(
  "/:areaId",
  validate(Schema.GetAreaDetailsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  AreaController.getAreaDetails
);

router.patch(
  "/:areaId",
  validate(Schema.UpdateAreaSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  AreaController.updateArea
);

router.delete(
  "/:areaId",
  validate(Schema.DeleteAreaSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  AreaController.deleteArea
);

export default router;