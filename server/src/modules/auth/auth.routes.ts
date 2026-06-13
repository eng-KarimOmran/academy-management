import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import auth from "../../middlewares/auth.middleware";
import { TokenType } from "../../shared/utils/Token";
import * as Schema from "./auth.schema";
import AuthController from "./auth.controller";
import { CreateUserSchema } from "../user/user.schema";

const router = Router();

router.post("/login", validation(Schema.LoginSchema), AuthController.login);

router.get("/refresh", auth(TokenType.REFRESH), AuthController.refresh);

router.post("/sign-up-first-user", validation(CreateUserSchema), AuthController.createFirstOwner);

router.use(auth(TokenType.ACCESS));

router.post("/logout", validation(Schema.LogoutSchema), AuthController.logout);

router.patch(
  "/change-password",
  validation(Schema.changePasswordSchema),
  AuthController.changePassword,
);

export default router;