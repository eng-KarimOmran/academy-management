import { Router } from "express";
import validation from "../../middlewares/validation.middleware";
import * as Schema from "./client.schema";
import ClientController from "./client.controller";
import checkRole from "../../middlewares/role.middleware";
import { isAcademyOwnerMiddleware } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validation(Schema.GetAllClientsSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  ClientController.getAllClients,
);

router.post(
  "/",
  validation(Schema.CreateClientSchema),
  checkRole(["OWNER", "SECRETARY"]),
  ClientController.createClient,
);

router.get(
  "/phone/:phone",
  validation(Schema.GetClientByPhoneSchema),
  checkRole(["OWNER", "SECRETARY"]),
  ClientController.getDetailsClientByPhone,
);

router.get(
  "/:clientId",
  validation(Schema.GetClientDetailsSchema),
  checkRole(["OWNER", "SECRETARY"]),
  ClientController.getDetailsClient,
);

router.patch(
  "/:clientId",
  validation(Schema.UpdateClientSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  ClientController.updateClient,
);

router.delete(
  "/:clientId",
  validation(Schema.DeleteClientSchema),
  checkRole(["OWNER"]),
  isAcademyOwnerMiddleware,
  ClientController.deleteClient,
);

export default router;