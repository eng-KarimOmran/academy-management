import { Router } from "express";
import validation from "../../middlewares/validation.middleware";

import * as Schema from "./secretary.schema";
import * as controller from "./secretary.controller";

import checkRole from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllSecretariesSchema),
  checkRole(["OWNER"]),
  controller.getAllSecretary,
);

router.post(
  "/",
  validation(Schema.CreateSecretarySchema),
  checkRole(["OWNER"]),
  controller.createSecretary,
);

router.get(
  "/:secretaryId",
  validation(Schema.GetSecretaryDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getDetailsSecretary,
);

router.patch(
  "/:secretaryId",
  validation(Schema.UpdateSecretarySchema),
  checkRole(["OWNER"]),
  controller.updateSecretary,
);

router.delete(
  "/:secretaryId",
  validation(Schema.DeleteSecretarySchema),
  checkRole(["OWNER"]),
  controller.deleteSecretary,
);

export default router;
