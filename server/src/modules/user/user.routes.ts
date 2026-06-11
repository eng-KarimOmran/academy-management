import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./user.schema";
import UserController from "./user.controller";
import checkRole from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllUsersSchema),
  checkRole(["OWNER"]),
  UserController.getAllUser,
);

router.post(
  "/",
  validation(Schema.CreateUserSchema),
  checkRole(["OWNER"]),
  UserController.createUser,
);

router.get(
  "/:userId",
  validation(Schema.GetUserDetailsSchema),
  checkRole(["OWNER"]),
  UserController.getDetailsUser,
);

router.patch(
  "/:userId",
  validation(Schema.UpdateUserSchema),
  checkRole(["OWNER"]),
  UserController.updateUser,
);

router.delete(
  "/:userId",
  validation(Schema.DeleteUserSchema),
  checkRole(["OWNER"]),
  UserController.deleteUser,
);

export default router;