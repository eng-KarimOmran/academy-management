import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  UserCreateInput,
  UserUpdateInput,
  UserWhereInput,
  UserOrderByWithRelationInput,
  UserSelect,
} from "../../../prisma/generated/models";
import { userBaseSelect } from './user.selectors';
import getClient from "../../shared/utils/getClient"


const UserRepository = {
  async create({ data, select, tx }: { data: UserCreateInput; select?: UserSelect; tx?: TransactionClient }) {
    return getClient(tx).user.create({
      data,
      select: select ?? userBaseSelect,
    });
  },

  async update({ userId, data, select, tx }: { userId: string; data: UserUpdateInput; select?: UserSelect; tx?: TransactionClient }) {
    return getClient(tx).user.update({
      where: { id: userId },
      data,
      select: select ?? userBaseSelect,
    });
  },

  async delete({ userId, select, tx }: { userId: string; select?: UserSelect; tx?: TransactionClient }) {
    return getClient(tx).user.delete({
      where: { id: userId },
      select: select ?? userBaseSelect,
    });
  },

  async findById({ userId, select, tx }: { userId: string; select?: UserSelect; tx?: TransactionClient }) {
    return getClient(tx).user.findUnique({
      where: { id: userId },
      select: select ?? userBaseSelect,
    });
  },

  async findByPhone({ phone, select, tx }: { phone: string; select?: UserSelect; tx?: TransactionClient }) {
    return getClient(tx).user.findFirst({
      where: { phone },
      select: select ?? userBaseSelect,
    });
  },

  async findFirst({ where, select, tx }: { where: UserWhereInput; select?: UserSelect; tx?: TransactionClient }) {
    return getClient(tx).user.findFirst({
      where,
      select: select ?? userBaseSelect,
    });
  },

  async findMany({ where, skip, take, orderBy, select, tx }: { skip?: number; take?: number; where?: UserWhereInput; orderBy?: UserOrderByWithRelationInput; select?: UserSelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [users, count] = await Promise.all([
      client.user.findMany({ where, skip, take, orderBy, select: select ?? userBaseSelect }),
      client.user.count({ where }),
    ]);

    return { users, count };
  }
};

export default UserRepository;