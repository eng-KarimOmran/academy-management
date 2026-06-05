import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./car.schema";
import * as controller from "./car.controller";
import checkRole from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllCarsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getAllCars,
);

router.post(
  "/",
  validation(Schema.CreateCarSchema),
  checkRole(["OWNER"]),
  controller.createCar,
);

router.get(
  "/:carId",
  validation(Schema.GetCarDetailsSchema),
  checkRole(["OWNER"]),
  controller.getDetailsCar,
);

router.patch(
  "/:carId",
  validation(Schema.UpdateCarSchema),
  checkRole(["OWNER"]),
  controller.updateCar,
);

router.delete(
  "/:carId",
  validation(Schema.DeleteCarSchema),
  checkRole(["OWNER"]),
  controller.deleteCar,
);

export default router;