import { Router } from "express";
import routerAuth from "../../modules/auth/auth.routes";
import routerUser from "../../modules/user/user.routes";
import routerAcademy from "../../modules/academy/academy.routes";
import routerArea from "../../modules/area/area.routes";
import routerCaptain from "../../modules/captain/captain.routes";
import routerCar from "../../modules/car/car.routes";
import routerSecretary from "../../modules/secretary/secretary.routes";
import auth from "../../middlewares/auth.middleware";
import { checkPasswordChange } from "../../middlewares/checkPasswordChange.middlewares";

const router = Router();

router.use("/auth", routerAuth);

router.use(auth(), checkPasswordChange);

router.use("/academies", routerAcademy);
router.use("/users", routerUser);
router.use("/cars", routerCar);
router.use("/captains", routerCaptain);
router.use("/secretaries", routerSecretary);
router.use("/areas", routerArea);

export default router;
