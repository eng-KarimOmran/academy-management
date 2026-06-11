import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./car.schema";
import CarController from "./car.controller";
import checkRole from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllCarsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  CarController.getAllCars,
);

router.post(
  "/",
  validation(Schema.CreateCarSchema),
  checkRole(["OWNER"]),
  CarController.createCar,
);

router.get(
  "/:carId",
  validation(Schema.GetCarDetailsSchema),
  checkRole(["OWNER"]),
  CarController.getDetailsCar,
);

router.patch(
  "/:carId",
  validation(Schema.UpdateCarSchema),
  checkRole(["OWNER"]),
  CarController.updateCar,
);

router.delete(
  "/:carId",
  validation(Schema.DeleteCarSchema),
  checkRole(["OWNER"]),
  CarController.deleteCar,
);

export default router;