import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  CaptainCreateInput,
  CaptainOrderByWithRelationInput,
  CaptainSelect,
  CaptainUpdateInput,
  CaptainWhereInput,
} from "../../../prisma/generated/models";
import { CaptainBaseSelect } from "./captain.selectors";
import { lessonBaseSelect } from "../lesson/lesson.selectors";
import getClient from "../../shared/utils/getClient"

const CaptainRepository = {
  async create({ data, select, tx }: { data: CaptainCreateInput; select?: CaptainSelect; tx?: TransactionClient }) {
    return getClient(tx).captain.create({
      data,
      select: select ?? CaptainBaseSelect,
    });
  },

  async update({ captainId, data, select, tx }: { captainId: string; data: CaptainUpdateInput; select?: CaptainSelect; tx?: TransactionClient }) {
    return getClient(tx).captain.update({
      where: { id: captainId },
      data,
      select: select ?? CaptainBaseSelect,
    });
  },

  async delete({ captainId, select, tx }: { captainId: string; select?: CaptainSelect; tx?: TransactionClient }) {
    return getClient(tx).captain.delete({
      where: { id: captainId },
      select: select ?? CaptainBaseSelect,
    });
  },

  async findById({ captainId, select, tx }: { captainId: string; select?: CaptainSelect; tx?: TransactionClient }) {
    return getClient(tx).captain.findUnique({
      where: { id: captainId },
      select: select ?? CaptainBaseSelect,
    });
  },

  async findByUserId({ userId, select, tx }: { userId: string; select?: CaptainSelect; tx?: TransactionClient }) {
    return getClient(tx).captain.findUnique({
      where: { userId },
      select: select ?? CaptainBaseSelect,
    });
  },

  async findMany({ where, skip, take, orderBy, select, tx }: { skip?: number; take?: number; where?: CaptainWhereInput; orderBy?: CaptainOrderByWithRelationInput; select?: CaptainSelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [captains, count] = await Promise.all([
      client.captain.findMany({ where, skip, take, orderBy, select: select ?? CaptainBaseSelect }),
      client.captain.count({ where }),
    ]);
    return { captains, count };
  },

  async getLessonsByCaptainId({ captainId, gte, lte, tx }: { captainId: string; gte: Date; lte: Date; tx?: TransactionClient }) {
    return getClient(tx).lesson.findMany({
      where: {
        captainId,
        startTime: { gte, lte },
      },
      select: lessonBaseSelect,
      orderBy: { startTime: "asc" },
    });
  }
};

export default CaptainRepository;