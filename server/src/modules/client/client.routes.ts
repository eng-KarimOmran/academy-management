import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./client.schema";
import * as controller from "./client.controller";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validation(Schema.GetAllClientsSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.getAllClients,
);

router.post(
  "/",
  validation(Schema.CreateClientSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.createClient,
);

router.get(
  "/phone/:phone",
  validation(Schema.GetClientByPhoneSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getDetailsClientByPhone,
);

router.get(
  "/:clientId",
  validation(Schema.GetClientDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  controller.getDetailsClient,
);

router.patch(
  "/:clientId",
  validation(Schema.UpdateClientSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.updateClient,
);

router.delete(
  "/:clientId",
  validation(Schema.DeleteClientSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  controller.deleteClient,
);

export default router;
