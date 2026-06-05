import * as DTO from "./client.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPaginationParams } from "../../shared/utils/Pagination";
import {
  createClient,
  deleteClient,
  findClientById,
  findClientByPhone,
  findManyClients,
  getOtherFilesByPhone,
  updateClient,
} from "./client.repository";
import { buildClientWhere } from "./client.utils";
import { clientDetailsSelect } from "./client.selectors";

export const create = async (dataSafe: DTO.CreateClientDto) => {
  const { body, params } = dataSafe;
  const { name, phone, clientSource } = body;
  const { academyId } = params;

  const clientExists = await findClientByPhone({ phone, academyId });

  if (clientExists) throw ApiError.Conflict("Phone");

  return await createClient({
    phone,
    name,
    clientSource,
    academy: { connect: { id: academyId } },
  });
};

export const getAll = async (dataSafe: DTO.GetAllClientsDto) => {
  const { query, params } = dataSafe;
  const { academyId } = params;
  const { limit, page, search } = query;

  const where = buildClientWhere({ search, academyId });

  const { count, clients } = await findManyClients({
    where,
    take: limit,
    skip: Math.min(0, page - 1) * limit,
    orderBy: { createdAt: "desc" },
  });

  const { safePage, totalPages } = getPaginationParams({
    limit,
    page,
    count,
  });

  const pagination = { limit, page: safePage, count, totalPages };

  return { items: clients, pagination };
};

export const getDetails = async (dataSafe: DTO.ClientDetailsDto) => {
  const { clientId, academyId } = dataSafe.params;

  const client = await findClientById({
    id: clientId,
    select: clientDetailsSelect,
  });

  if (!client) throw ApiError.NotFound({ model: "Client" });

  const otherFiles = await getOtherFilesByPhone({
    phone: client.phone,
    academyId,
  });

  return { currentClient: client, otherFiles };
};

export const update = async (dataSafe: DTO.UpdateClientDto) => {
  const { body, params } = dataSafe;
  const { clientId, academyId } = params;

  const client = await findClientById({ id: clientId });

  if (!client) throw ApiError.NotFound({ model: "Client" });

  if (body.phone && client.phone !== body.phone) {
    const existingPhone = await findClientByPhone({
      phone: body.phone,
      academyId,
    });
    if (existingPhone) throw ApiError.Conflict("Phone");
  }

  return await updateClient({ id: clientId, data: body });
};

export const remove = async (dataSafe: DTO.DeleteClientDto) => {
  const { clientId } = dataSafe.params;

  const client = await findClientById({ id: clientId });

  if (!client) throw ApiError.NotFound({ model: "Client" });

  return await deleteClient(clientId);
};

export const getClientByPhone = async (dataSafe: DTO.GetClientByPhoneDto) => {
  const { phone, academyId } = dataSafe.params;

  const client = await findClientByPhone({
    phone,
    academyId,
    select: clientDetailsSelect,
  });

  if (!client) throw ApiError.NotFound({ model: "Client" });

  const otherFiles = await getOtherFilesByPhone({
    phone,
    academyId,
  });

  return { currentClient: client, otherFiles };
};
