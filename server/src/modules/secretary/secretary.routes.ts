import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import * as Schema from "./secretary.schema";
import SecretaryController from "./secretary.controller";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validation(Schema.GetAllSecretariesSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  SecretaryController.getAllSecretary,
);

router.post(
  "/",
  validation(Schema.CreateSecretarySchema),
  checkAcademyExists({ isAcademyOwner: true }),
  SecretaryController.createSecretary,
);

router.get(
  "/:secretaryId",
  validation(Schema.GetSecretaryDetailsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  SecretaryController.getDetailsSecretary,
);

router.patch(
  "/:secretaryId",
  validation(Schema.UpdateSecretarySchema),
  checkAcademyExists({ isAcademyOwner: true }),
  SecretaryController.updateSecretary,
);

router.delete(
  "/:secretaryId",
  validation(Schema.DeleteSecretarySchema),
  checkAcademyExists({ isAcademyOwner: true }),
  SecretaryController.deleteSecretary,
);

export default router;