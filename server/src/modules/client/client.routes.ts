import { Router } from "express";
import validation from "../../shared/middlewares/validation.middleware";
import * as Schema from "./client.schema";
import ClientController from "./client.controller";
import checkRole from "../../shared/middlewares/role.middleware";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  validation(Schema.GetAllClientsSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  ClientController.getAllClients,
);

router.post(
  "/",
  validation(Schema.CreateClientSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  ClientController.createClient,
);

router.get(
  "/phone/:phone",
  validation(Schema.GetClientByPhoneSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  ClientController.getDetailsClientByPhone,
);

router.get(
  "/:clientId",
  validation(Schema.GetClientDetailsSchema),
  checkRole(["OWNER", "SECRETARY", "MANAGER"]),
  ClientController.getDetailsClient,
);

router.patch(
  "/:clientId",
  validation(Schema.UpdateClientSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  ClientController.updateClient,
);

router.delete(
  "/:clientId",
  validation(Schema.DeleteClientSchema),
  checkAcademyExists({ isAcademyOwner: true }),
  ClientController.deleteClient,
);

export default router;