import { Router } from "express";
import validate from "../../shared/middlewares/validate.middleware";
import * as Schema from "./user.schema";
import UserController from "./user.controller";
import { isAdmin } from "./user.middleware";

const router = Router();


router.get(
  "/",
  validate(Schema.GetAllUsersSchema),
  isAdmin,
  UserController.getAllUser,
);

router.post(
  "/",
  validate(Schema.CreateUserSchema),
  isAdmin,
  UserController.createUser,
);

router.get(
  "/:userId",
  validate(Schema.GetUserDetailsSchema),
  UserController.getDetailsUser,
);

router.patch(
  "/:userId/new-password",
  validate(Schema.newPasswordSchema),
  isAdmin,
  UserController.newPassword,
);

router.patch(
  "/:userId",
  validate(Schema.UpdateUserSchema),
  isAdmin,
  UserController.updateUser,
);

router.delete(
  "/:userId",
  validate(Schema.DeleteUserSchema),
  isAdmin,
  UserController.deleteUser,
);

export default router;