import { Router } from "express";
import AreaController from "./area.controller";
import * as Schema from "./area.schema";
import validate from "../../shared/middlewares/validate.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validate(Schema.GetAllAreasSchema),
  checkAcademyExists(),
  AreaController.getAllAreas
);

router.use(checkAcademyExists({ isAcademyOwner: true }))

router.post(
  "/",
  validate(Schema.CreateAreaSchema),
  AreaController.createArea
);

router.get(
  "/:areaId",
  validate(Schema.GetAreaDetailsSchema),
  AreaController.getAreaDetails
);

router.patch(
  "/:areaId",
  validate(Schema.UpdateAreaSchema),
  AreaController.updateArea
);

router.delete(
  "/:areaId",
  validate(Schema.DeleteAreaSchema),
  AreaController.deleteArea
);

export default router;