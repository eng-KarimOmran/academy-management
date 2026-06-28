import { Router } from "express";
import JobProfileController from "./jobProfile.controller";
import * as Schema from "./jobProfile.schema";
import validate from "../../shared/middlewares/validate.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";
import allowJobProfiles from "./jobProfile.middlewares";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validate(Schema.getAllJobProfilesSchema),
  allowJobProfiles(["MANAGER", "SECRETARY"]),
  JobProfileController.getAllJobProfiles
);

router.get(
  "/:jobProfileId",
  validate(Schema.getJobProfileDetailsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  JobProfileController.getJobProfileDetails
);

router.post(
  "/",
  validate(Schema.createJobProfileSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  JobProfileController.createJobProfile
);

router.patch(
  "/:jobProfileId",
  validate(Schema.updateJobProfileSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  JobProfileController.updateJobProfile
);

router.delete(
  "/:jobProfileId",
  validate(Schema.deleteJobProfileSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  JobProfileController.deleteJobProfile
);

export default router;