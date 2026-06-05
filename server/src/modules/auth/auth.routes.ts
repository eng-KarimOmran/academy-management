import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import auth from "../../middlewares/auth.middleware";
import { TokenType } from "../../shared/utils/Token";
import * as Schema from "./auth.schema";
import * as controller from "./auth.controller";

const router = Router();

router.post("/login", validation(Schema.LoginSchema), controller.login);

router.get("/refresh", auth(TokenType.REFRESH), controller.refresh);

router.use(auth(TokenType.ACCESS));

router.post("/logout", validation(Schema.LogoutSchema), controller.logout);

router.patch(
  "/change-password",
  validation(Schema.changePasswordSchema),
  controller.changePassword,
);

export default router;
