import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./area.schema";
import * as controller from "./area.controller";
import checkRole from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllAreasSchema),
  checkRole(["OWNER"]),
  controller.getAllAreas,
);

router.post(
  "/",
  validation(Schema.CreateAreaSchema),
  checkRole(["OWNER"]),
  controller.createArea,
);

router.get(
  "/:areaId",
  validation(Schema.GetAreaDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getDetailsArea,
);

router.patch(
  "/:areaId",
  validation(Schema.UpdateAreaSchema),
  checkRole(["OWNER"]),
  controller.updateArea,
);

router.delete(
  "/:areaId",
  validation(Schema.DeleteAreaSchema),
  checkRole(["OWNER"]),
  controller.deleteArea,
);

export default router;