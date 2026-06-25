import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import * as Schema from "./user.schema";
import UserController from "./user.controller";
import { isAdmin } from "./user.middleware";

const router = Router();


router.get(
  "/",
  validation(Schema.GetAllUsersSchema),
  isAdmin,
  UserController.getAllUser,
);

router.post(
  "/",
  validation(Schema.CreateUserSchema),
  isAdmin,
  UserController.createUser,
);

router.get(
  "/:userId",
  validation(Schema.GetUserDetailsSchema),
  UserController.getDetailsUser,
);

router.patch(
  "/:userId/new-password",
  validation(Schema.newPasswordSchema),
  isAdmin,
  UserController.newPassword,
);

router.patch(
  "/:userId",
  validation(Schema.UpdateUserSchema),
  isAdmin,
  UserController.updateUser,
);

router.delete(
  "/:userId",
  validation(Schema.DeleteUserSchema),
  isAdmin,
  UserController.deleteUser,
);

export default router;