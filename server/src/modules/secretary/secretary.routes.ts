import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./secretary.schema";
import SecretaryController from "./secretary.controller";
import checkRole from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllSecretariesSchema),
  checkRole(["OWNER"]),
  SecretaryController.getAllSecretary,
);

router.post(
  "/",
  validation(Schema.CreateSecretarySchema),
  checkRole(["OWNER"]),
  SecretaryController.createSecretary,
);

router.get(
  "/:secretaryId",
  validation(Schema.GetSecretaryDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  SecretaryController.getDetailsSecretary,
);

router.patch(
  "/:secretaryId",
  validation(Schema.UpdateSecretarySchema),
  checkRole(["OWNER"]),
  SecretaryController.updateSecretary,
);

router.delete(
  "/:secretaryId",
  validation(Schema.DeleteSecretarySchema),
  checkRole(["OWNER"]),
  SecretaryController.deleteSecretary,
);

export default router;