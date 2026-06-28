import { IClientService } from "./client.type";
import { prisma } from "../../lib/prisma";
import ApiError from "../../shared/utils/ApiError";
import { buildPagination, buildPaginationMeta } from "../../shared/utils/Pagination";
import { buildClientWhere, orderBy } from "./client.utils";
import { ClientGetPayload } from "../../../prisma/generated/models";

const ClientService: IClientService = {
  async createClient({ params, body }) {
    const { academyId } = params;
    const { phone } = body;

    const phoneExists = await prisma.client.findUnique({ where: { phone_academyId: { phone, academyId } } });

    if (phoneExists) {
      throw ApiError.Conflict("PHONE_ALREADY_EXISTS");
    }

    return prisma.client.create({
      data: {
        academy: {
          connect: {
            id: academyId,
          },
        },
        ...body,
      },
    });
  },

  async updateClient({ params, body }) {
    const { clientId, academyId } = params;

    const client = await prisma.client.findUnique({
      where: { id: clientId, academyId },
    });

    if (!client) throw ApiError.NotFound("Client");

    return prisma.client.update({
      where: { id: clientId },
      data: body,
    });
  },

  async deleteClient({ params }) {
    const { clientId, academyId } = params;

    const client = await prisma.client.findUnique({
      where: { id: clientId, academyId },
    });

    if (!client) throw ApiError.NotFound("Client");

    return prisma.client.delete({
      where: { id: clientId },
    });
  },

  async getAllClients({ params, query }) {
    const { academyId } = params;
    const { page, limit, ...filters } = query;

    const pagination = buildPagination({ page, limit });

    const where = buildClientWhere({
      academyId,
      ...filters,
    });

    const { clients, count } = await prisma.$transaction(async (tx) => {
      const [clients, count] = await Promise.all([
        tx.client.findMany({
          where,
          ...pagination,
          orderBy,
        }),
        tx.client.count({ where }),
      ]);

      return { clients, count };
    });

    return {
      items: clients,
      pagination: buildPaginationMeta({
        page,
        limit,
        count,
      }),
    };
  },

  async getClientDetails({ params, query }) {
    const { academyId } = params;
    const { phone, clientId } = query

    if (!phone && !clientId) {
      throw ApiError.ValidationError("يجب إرسال رقم الهاتف أو معرف العميل")
    }

    let currentClient: ClientGetPayload<{ include: { subscriptions: true } }> | null = null

    if (clientId) {
      const client = await prisma.client.findUnique({
        where: { id: clientId, academyId },
        include: { subscriptions: true, academy: true }
      });
      if (client) {
        currentClient = client
      }
    }

    if (phone) {
      const client = await prisma.client.findFirst({
        where: { academyId, phone },
        include: { subscriptions: true, academy: true }
      });
      if (client) {
        currentClient = client
      }
    }

    if (!currentClient) throw ApiError.NotFound("Client")

    const OtherFiles = await prisma.client.findMany({
      where: { phone, academyId: { not: currentClient.academyId } },
      include: { academy: true }
    });

    return {
      currentClient,
      OtherFiles,
    };
  }
};

export default ClientService;