import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./area.schema";
import checkRole from "../../middlewares/role.middleware";
import AreaController from "./area.controller";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllAreasSchema),
  checkRole(["OWNER", "SECRETARY"]),
  AreaController.getAllAreas,
);

router.post(
  "/",
  validation(Schema.CreateAreaSchema),
  checkRole(["OWNER"]),
  AreaController.createArea,
);

router.get(
  "/:areaId",
  validation(Schema.GetAreaDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  AreaController.getDetailsArea,
);

router.patch(
  "/:areaId",
  validation(Schema.UpdateAreaSchema),
  checkRole(["OWNER"]),
  AreaController.updateArea,
);

router.delete(
  "/:areaId",
  validation(Schema.DeleteAreaSchema),
  checkRole(["OWNER"]),
  AreaController.deleteArea,
);

export default router;