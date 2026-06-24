import { Response } from "express";
import * as DTO from "./client.dto";
import { RequestAuth } from "../../shared/middlewares/auth.middleware";
import ClientService from "./client.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestAcademy } from "../academy/academy.middleware";

const ClientController = {
  createClient: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateClientDto;

    const client = await ClientService.create({ dataSafe });

    return sendSuccess({
      res,
      statusCode: 201,
      data: client,
      message: "تم إنشاء العميل بنجاح",
    });
  },

  getAllClients: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllClientsDto;

    const data = await ClientService.getAll({ dataSafe });

    return sendSuccess({
      res,
      data,
    });
  },

  getDetailsClient: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.ClientDetailsDto;

    const clientData = await ClientService.getDetails({ dataSafe });

    return sendSuccess({
      res,
      data: clientData,
    });
  },

  updateClient: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateClientDto;

    const updatedClient = await ClientService.update({ dataSafe });

    return sendSuccess({
      res,
      data: updatedClient,
      message: "تم تحديث العميل بنجاح",
    });
  },

  deleteClient: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteClientDto;

    await ClientService.delete({ dataSafe });

    return sendSuccess({
      res,
      message: "تم حذف العميل نهائيًا",
    });
  },

  getDetailsClientByPhone: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetClientByPhoneDto;

    const clientData = await ClientService.getClientByPhone({ dataSafe });

    return sendSuccess({
      res,
      data: clientData,
    });
  },
};

export default ClientController;