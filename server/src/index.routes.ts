import { Router } from "express";
import routerAuth from "./modules/auth/auth.routes";
import { auth, checkPasswordChange } from "./modules/auth/auth.middleware";
import { TokenType } from "./modules/auth/auth.type";
import routerUser from "./modules/user/user.routes";
// import routerAcademy from "./modules/academy/academy.routes";
// import routerArea from "./modules/area/area.routes";
// import routerCar from "./modules/car/car.routes";

const router = Router();

router.use("/auth", routerAuth);

router.use(auth(TokenType.ACCESS));

router.use("/users", routerUser);

// router.use("/academies", routerAcademy);
// router.use("/cars", routerCar);
// router.use("/areas", routerArea);

export default router;
