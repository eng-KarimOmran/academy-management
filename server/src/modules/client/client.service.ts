import { TransactionClient } from './../../../prisma/generated/internal/prismaNamespace';
import * as DTO from "./client.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { prisma } from "../../lib/prisma";
import { buildClientWhere } from "./client.utils";
import { clientBaseSelect, clientDetailsSelect } from "./client.selectors";
import { Client } from "../../../prisma/generated/client";

interface IClientService {
  create: (data: { dataSafe: DTO.CreateClientDto; tx?: TransactionClient }) => Promise<Client>;
  getAll: (data: { dataSafe: DTO.GetAllClientsDto; tx?: TransactionClient }) => Promise<{ items: Client[]; pagination: { limit: number; page: number; totalPages: number; total: number } }>;
  getDetails: (data: { dataSafe: DTO.ClientDetailsDto; tx?: TransactionClient }) => Promise<{ currentClient: Client; otherFiles: Client[] }>;
  update: (data: { dataSafe: DTO.UpdateClientDto; tx?: TransactionClient }) => Promise<Client>;
  delete: (data: { dataSafe: DTO.DeleteClientDto; tx?: TransactionClient }) => Promise<Client>;
  getClientByPhone: (data: { dataSafe: DTO.GetClientByPhoneDto; tx?: TransactionClient }) => Promise<Client>;
}

const ClientService: IClientService = {
  async create({ dataSafe, tx }) {
    const { body, params } = dataSafe;
    const { name, phone, clientSource } = body;
    const { academyId } = params;

    const run = async (tx: TransactionClient) => {
      const clientExists = await tx.client.findFirst({
        where: { phone, academyId }
      });
      if (clientExists) throw ApiError.Conflict("Phone");

      return await tx.client.create({
        data: {
          phone,
          name,
          clientSource,
          academy: { connect: { id: academyId } },
        },
        select: clientBaseSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getAll({ dataSafe, tx }) {
    const { query, params } = dataSafe;
    const { academyId } = params;
    const { limit, page, search } = query;

    const run = async (tx: TransactionClient) => {
      const where = buildClientWhere({ search, academyId });
      const { take, skip } = getPagination({ page, limit });

      const [clients, count] = await Promise.all([
        tx.client.findMany({
          where,
          take,
          skip,
          orderBy: { createdAt: "desc" },
          select: clientBaseSelect
        }),
        tx.client.count({ where })
      ]);

      const totalPages = getTotalPages({ limit, count });
      const pagination = { limit, page, totalPages, total: count };

      return { items: clients, pagination };
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getDetails({ dataSafe, tx }) {
    const { clientId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const client = await tx.client.findUnique({
        where: { id: clientId },
        select: clientDetailsSelect,
      });
      if (!client) throw ApiError.NotFound({ model: "Client" });

      const otherFiles = await tx.client.findMany({
        where: {
          phone: client.phone,
          NOT: { id: clientId }
        },
        select: clientBaseSelect
      });

      return { currentClient: client, otherFiles };
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async update({ dataSafe, tx }) {
    const { body, params } = dataSafe;
    const { clientId, academyId } = params;

    const run = async (tx: TransactionClient) => {
      const client = await tx.client.findUnique({ where: { id: clientId } });
      if (!client) throw ApiError.NotFound({ model: "Client" });

      if (body.phone && client.phone !== body.phone) {
        const existingPhone = await tx.client.findFirst({
          where: { phone: body.phone, academyId },
        });
        if (existingPhone) throw ApiError.Conflict("Phone");
      }

      return await tx.client.update({
        where: { id: clientId },
        data: body,
        select: clientDetailsSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async delete({ dataSafe, tx }) {
    const { clientId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const client = await tx.client.findUnique({ where: { id: clientId } });
      if (!client) throw ApiError.NotFound({ model: "Client" });

      return await tx.client.delete({
        where: { id: clientId },
        select: clientBaseSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getClientByPhone({ dataSafe, tx }) {
    const { phone, academyId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const client = await tx.client.findFirst({
        where: { phone, academyId },
        select: clientBaseSelect,
      });
      if (!client) throw ApiError.NotFound({ model: "Client" });

      return client;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  }
};

export default ClientService;