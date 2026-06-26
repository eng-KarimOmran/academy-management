import { Router } from "express";
import JobProfileController from "./jobProfile.controller";
import * as Schema from "./jobProfile.schema";
import validate from "../../shared/middlewares/validate.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validate(Schema.createJobProfileSchema),
  JobProfileController.createJobProfile
);

router.get(
  "/",
  validate(Schema.getAllJobProfilesSchema),
  JobProfileController.getAllJobProfiles
);

router.get(
  "/:jobProfileId",
  validate(Schema.getJobProfileDetailsSchema),
  JobProfileController.getJobProfileDetails
);

router.patch(
  "/:jobProfileId",
  validate(Schema.updateJobProfileSchema),
  JobProfileController.updateJobProfile
);

router.delete(
  "/:jobProfileId",
  validate(Schema.deleteJobProfileSchema),
  JobProfileController.deleteJobProfile
);

export default router;