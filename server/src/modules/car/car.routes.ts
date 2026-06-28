import { Router } from "express";
import CarController from "./car.controller";
import * as Schema from "./car.schema";
import validate from "../../shared/middlewares/validate.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";
import allowJobProfiles from "../jobProfile/jobProfile.middlewares"
import { JobProfileType } from "../../../prisma/generated/enums";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validate(Schema.GetAllCarsSchema),
  allowJobProfiles(["MANAGER", "SECRETARY"]),
  CarController.getAllCars
);


router.post(
  "/",
  validate(Schema.CreateCarSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  CarController.createCar
);

router.get(
  "/:carId",
  validate(Schema.GetCarDetailsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  CarController.getDetails
);

router.patch(
  "/:carId",
  validate(Schema.UpdateCarSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  CarController.updateCar
);

router.delete(
  "/:carId",
  validate(Schema.DeleteCarSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  CarController.deleteCar
);

export default router;