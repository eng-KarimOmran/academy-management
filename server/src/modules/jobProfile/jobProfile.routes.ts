import { Router } from "express";
import JobProfileController from "./jobProfile.controller";
import * as Schema from "./jobProfile.schema";
import validation from "../../shared/middlewares/validation.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validation(Schema.createJobProfileSchema),
  JobProfileController.createJobProfile
);

router.get(
  "/",
  validation(Schema.getAllJobProfilesSchema),
  JobProfileController.getAllJobProfiles
);

router.get(
  "/:jobProfileId",
  validation(Schema.getJobProfileDetailsSchema),
  JobProfileController.getJobProfileDetails
);

router.patch(
  "/:jobProfileId",
  validation(Schema.updateJobProfileSchema),
  JobProfileController.updateJobProfile
);

router.delete(
  "/:jobProfileId",
  validation(Schema.deleteJobProfileSchema),
  JobProfileController.deleteJobProfile
);

export default router;