import { auth } from './auth.middleware';
import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import * as Schema from "./auth.schema";
import AuthController from "./auth.controller";
import { TokenType } from './auth.type';

const router = Router();

router.post(
  "/login",
  validation(Schema.LoginSchema),
  AuthController.login
);

router.post(
  "/first-user",
  validation(Schema.createFirstUserSchema),
  AuthController.createFirstUser
);

router.post(
  "/logout",
  validation(Schema.LogoutSchema),
  auth(TokenType.REFRESH),
  AuthController.logout
);

router.get(
  "/refresh",
  auth(TokenType.REFRESH),
  AuthController.refresh
);

router.patch(
  "/change-password",
  validation(Schema.changePasswordSchema),
  auth(TokenType.ACCESS),
  AuthController.changePassword,
);

export default router