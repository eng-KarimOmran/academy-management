import { User } from "../../../prisma/generated/client";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  SecretaryCreateInput,
  SecretaryOrderByWithRelationInput,
  SecretarySelect,
  SecretaryUpdateInput,
  SecretaryWhereInput,
} from "../../../prisma/generated/models";
import { prisma } from "../../lib/prisma";
import { secretaryBaseSelect } from "./secretary.selectors";
import getClient from "../../shared/utils/getClient"
import UserService from "../user/user.service";

const SecretaryRepository = {
  async findById({ id, select, tx }: { id: string; select?: SecretarySelect; tx?: TransactionClient }) {
    return getClient(tx).secretary.findUnique({
      where: { id },
      select: select ?? secretaryBaseSelect,
    });
  },

  async findMany({ where, skip, take, orderBy, select, tx }: { skip?: number; take?: number; where?: SecretaryWhereInput; orderBy?: SecretaryOrderByWithRelationInput; select?: SecretarySelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [secretaries, count] = await Promise.all([
      client.secretary.findMany({
        where,
        skip,
        take,
        orderBy,
        select: select ?? secretaryBaseSelect,
      }),
      client.secretary.count({ where }),
    ]);
    return { secretaries, count };
  },

  async create({ data, user }: { data: SecretaryCreateInput; user: User }) {
    return await prisma.$transaction(async (tx) => {
      const secretary = await tx.secretary.create({
        data,
        select: secretaryBaseSelect,
      });
      await UserService.recalculateUserRole({ userId: user.id, tx });
      return { secretary };
    });
  },

  async update({ id, data, select, tx }: { id: string; data: SecretaryUpdateInput; select?: SecretarySelect; tx?: TransactionClient }) {
    return getClient(tx).secretary.update({
      where: { id },
      data,
      select: select ?? secretaryBaseSelect,
    });
  },

  async delete({ id, user }: { id: string; user: User }) {
    return await prisma.$transaction(async (tx) => {
      const secretary = await tx.secretary.delete({
        where: { id },
        select: secretaryBaseSelect,
      });
      await UserService.recalculateUserRole({ userId: user.id, tx });
      return secretary;
    });
  }
};

export default SecretaryRepository;