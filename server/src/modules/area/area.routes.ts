import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import checkRole from "../../shared/middlewares/role.middleware";
import AreaController from "./area.controller";
import { AreaSchema } from "./area.schema";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validation(AreaSchema.getAll),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  AreaController.getAllAreas
);

router.post(
  "/",
  validation(AreaSchema.create),
  checkRole(["OWNER", "MANAGER"]),
  AreaController.createArea
);

router.get(
  "/:areaId",
  validation(AreaSchema.get),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  AreaController.getDetailsArea
);

router.patch(
  "/:areaId",
  validation(AreaSchema.update),
  checkRole(["OWNER", "MANAGER"]),
  AreaController.updateArea
);

router.delete(
  "/:areaId",
  validation(AreaSchema.delete),
  checkRole(["OWNER", "MANAGER"]),
  AreaController.deleteArea
);

export default router;