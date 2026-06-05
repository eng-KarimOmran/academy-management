import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./user.schema";
import * as controller from "./user.controller";
import checkRole from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  validation(Schema.GetAllUsersSchema),
  checkRole(["OWNER"]),
  controller.getAllUser,
);

router.post(
  "/",
  validation(Schema.CreateUserSchema),
  checkRole(["OWNER"]),
  controller.createUser,
);

router.get(
  "/:userId",
  validation(Schema.GetUserDetailsSchema),
  checkRole(["OWNER"]),
  controller.getDetailsUser,
);

router.patch(
  "/:userId",
  validation(Schema.UpdateUserSchema),
  checkRole(["OWNER"]),
  controller.updateUser,
);

router.delete(
  "/:userId",
  validation(Schema.DeleteUserSchema),
  checkRole(["OWNER"]),
  controller.deleteUser,
);

export default router;
