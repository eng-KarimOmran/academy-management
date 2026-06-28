import { Router } from "express";
import validate from "../../shared/middlewares/validate.middleware";
import * as Schema from "./client.schema";
import ClientController from "./client.controller";
import { checkAcademyExists } from "../academy/academy.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validate(Schema.CreateClientSchema),
  ClientController.create
);

router.get(
  "/details",
  validate(Schema.GetClientDetailsSchema),
  ClientController.getDetails
);

router.use(checkAcademyExists({ isAcademyOwner: true }))

router.get(
  "/",
  validate(Schema.GetAllClientsSchema),
  ClientController.getAll
);



router.patch(
  "/:clientId",
  validate(Schema.UpdateClientSchema),
  ClientController.update
);

router.delete(
  "/:clientId",
  validate(Schema.DeleteClientSchema),
  ClientController.delete
);

export default router;