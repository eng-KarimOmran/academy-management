import { Router } from "express";
import CarController from "./car.controller";
import * as Schema from "./car.schema";
import validate from "../../shared/middlewares/validate.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validate(Schema.GetAllCarsSchema),
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