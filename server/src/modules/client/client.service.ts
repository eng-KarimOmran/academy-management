import * as DTO from "./client.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { buildClientWhere } from "./client.utils";
import { clientBaseSelect, clientDetailsSelect } from "./client.selectors";
import ClientRepository from "./client.repository";

const ClientService = {
  async create(dataSafe: DTO.CreateClientDto) {
    const { body, params } = dataSafe;
    const { name, phone, clientSource } = body;
    const { academyId } = params;

    const clientExists = await ClientRepository.findByPhone({ phone, academyId });
    if (clientExists) throw ApiError.Conflict("Phone");

    return await ClientRepository.create({
      data: {
        phone,
        name,
        clientSource,
        academy: { connect: { id: academyId } },
      },
    });
  },

  async getAll(dataSafe: DTO.GetAllClientsDto) {
    const { query, params } = dataSafe;
    const { academyId } = params;
    const { limit, page, search } = query;

    const where = buildClientWhere({ search, academyId });
    const { take, skip } = getPagination({ page, limit });

    const { clients, count } = await ClientRepository.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, totalPages, total: count };

    return { items: clients, pagination };
  },

  async getDetails(dataSafe: DTO.ClientDetailsDto) {
    const { clientId, academyId } = dataSafe.params;

    const client = await ClientRepository.findById({
      id: clientId,
      select: clientDetailsSelect,
    });

    if (!client) throw ApiError.NotFound({ model: "Client" });

    const otherFiles = await ClientRepository.getOtherFilesByPhone({
      phone: client.phone,
      academyId,
    });

    return { currentClient: client, otherFiles };
  },

  async update(dataSafe: DTO.UpdateClientDto) {
    const { body, params } = dataSafe;
    const { clientId, academyId } = params;

    const client = await ClientRepository.findById({ id: clientId });
    if (!client) throw ApiError.NotFound({ model: "Client" });

    if (body.phone && client.phone !== body.phone) {
      const existingPhone = await ClientRepository.findByPhone({
        phone: body.phone,
        academyId,
      });
      if (existingPhone) throw ApiError.Conflict("Phone");
    }

    return await ClientRepository.update({ id: clientId, data: body });
  },

  async remove(dataSafe: DTO.DeleteClientDto) {
    const { clientId } = dataSafe.params;

    const client = await ClientRepository.findById({ id: clientId });
    if (!client) throw ApiError.NotFound({ model: "Client" });

    return await ClientRepository.delete({ id: clientId });
  },

  async getClientByPhone(dataSafe: DTO.GetClientByPhoneDto) {
    const { phone, academyId } = dataSafe.params;

    const client = await ClientRepository.findByPhone({
      phone,
      academyId,
      select: clientBaseSelect,
    });

    if (!client) throw ApiError.NotFound({ model: "Client" });

    return client;
  }
};

export default ClientService;