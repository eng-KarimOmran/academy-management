import { Router } from "express";
import routerAuth from "./modules/auth/auth.routes";
import { auth, checkPasswordChange } from "./modules/auth/auth.middleware";
import { TokenType } from "./modules/auth/auth.type";
import routerUser from "./modules/user/user.routes";
import routerAcademy from "./modules/academy/academy.routes";
import routerEmployee from "./modules/employee/employee.router";
import routerPublic from "./modules/public/public.routes";

const router = Router();

router.use("/auth", routerAuth);

router.use("/public/:academyId", routerPublic);

router.use(auth(TokenType.ACCESS), checkPasswordChange);

router.use("/users", routerUser);
router.use("/academies", routerAcademy);
router.use("/employee", routerEmployee);

export default router;