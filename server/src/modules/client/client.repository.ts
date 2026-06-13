import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  ClientCreateInput,
  ClientOrderByWithRelationInput,
  ClientSelect,
  ClientUpdateInput,
  ClientWhereInput,
} from "../../../prisma/generated/models";
import { clientBaseSelect } from "./client.selectors";
import getClient from "../../shared/utils/getClient"

const ClientRepository = {
  async create({ data, select, tx }: { data: ClientCreateInput; select?: ClientSelect; tx?: TransactionClient }) {
    return getClient(tx).client.create({
      data,
      select: select ?? clientBaseSelect,
    });
  },

  async findById({ id, select, tx }: { id: string; select?: ClientSelect; tx?: TransactionClient }) {
    return getClient(tx).client.findUnique({
      where: { id },
      select: select ?? clientBaseSelect,
    });
  },

  async findByPhone({ phone, academyId, select, tx }: { phone: string; academyId: string; select?: ClientSelect; tx?: TransactionClient }) {
    return getClient(tx).client.findUnique({
      where: {
        academyId_phone: { phone, academyId },
      },
      select: select ?? clientBaseSelect,
    });
  },

  async update({ id, data, select, tx }: { id: string; data: ClientUpdateInput; select?: ClientSelect; tx?: TransactionClient }) {
    return getClient(tx).client.update({
      where: { id },
      data,
      select: select ?? clientBaseSelect,
    });
  },

  async delete({ id, select, tx }: { id: string; select?: ClientSelect; tx?: TransactionClient }) {
    return getClient(tx).client.delete({
      where: { id },
      select: select ?? clientBaseSelect,
    });
  },

  async findMany({ where, skip, take, orderBy, select, tx }: { skip?: number; take?: number; where?: ClientWhereInput; orderBy?: ClientOrderByWithRelationInput; select?: ClientSelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [clients, count] = await Promise.all([
      client.client.findMany({ where, skip, take, orderBy, select: select ?? clientBaseSelect }),
      client.client.count({ where }),
    ]);

    return { clients, count };
  },

  async getOtherFilesByPhone({ phone, academyId, tx }: { academyId: string; phone: string; tx?: TransactionClient }) {
    return getClient(tx).client.findMany({
      where: { phone, NOT: { academyId } },
      select: {
        ...clientBaseSelect,
        academy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },
  
  async count({ where, tx }: { where?: ClientWhereInput; tx?: TransactionClient }) {
    const client = getClient(tx);
    return await client.client.count({ where })
  }
};

export default ClientRepository;