import { Response } from "express";
import * as DTO from "./client.dto";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as ClientService from "./client.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestAcademy } from "../academy/academy.middleware";

export const createClient = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.CreateClientDto;

  const client = await ClientService.create(dataSafe);

  return sendSuccess({
    res,
    statusCode: 201,
    data: client,
    message: "Client created successfully",
  });
};

export const getAllClients = async (req: RequestAcademy, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetAllClientsDto;

  const data = await ClientService.getAll(dataSafe);

  return sendSuccess({
    res,
    data,
  });
};

export const getDetailsClient = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.ClientDetailsDto;

  const clientData = await ClientService.getDetails(dataSafe);

  return sendSuccess({
    res,
    data: clientData,
  });
};

export const updateClient = async (req: RequestAcademy, res: Response) => {
  const dataSafe = req.dataSafe as DTO.UpdateClientDto;

  const updatedClient = await ClientService.update(dataSafe);

  return sendSuccess({
    res,
    data: updatedClient,
    message: "Client updated successfully",
  });
};

export const deleteClient = async (req: RequestAcademy, res: Response) => {
  const dataSafe = req.dataSafe as DTO.DeleteClientDto;

  await ClientService.remove(dataSafe);

  return sendSuccess({
    res,
    message: "Client deleted permanently",
  });
};

export const getDetailsClientByPhone = async (
  req: RequestAuth,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.GetClientByPhoneDto;

  const clientData = await ClientService.getClientByPhone(dataSafe);

  return sendSuccess({
    res,
    data: clientData,
  });
};
