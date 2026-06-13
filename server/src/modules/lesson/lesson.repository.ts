import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  LessonCreateInput,
  LessonOrderByWithRelationInput,
  LessonSelect,
  LessonUpdateInput,
  LessonWhereInput,
} from "../../../prisma/generated/models";
import getClient from "../../shared/utils/getClient";
import { lessonBaseSelect } from "./lesson.selectors";

const LessonRepository = {
  async create({ data, tx }: { data: LessonCreateInput; tx?: TransactionClient }) {
    return await getClient(tx).lesson.create({
      data,
      select: lessonBaseSelect,
    });
  },

  async findById({ id, select, tx }: { id: string; select?: LessonSelect; tx?: TransactionClient }) {
    return await getClient(tx).lesson.findUnique({
      where: { id },
      select: select ?? lessonBaseSelect,
    });
  },

  async update({ id, data, select, tx }: { id: string; data: LessonUpdateInput; select?: LessonSelect; tx?: TransactionClient }) {
    return await getClient(tx).lesson.update({
      where: { id },
      data,
      select: select ?? lessonBaseSelect,
    });
  },

  async delete({ id, tx }: { id: string; tx?: TransactionClient }) {
    return await getClient(tx).lesson.delete({
      where: { id },
      select: lessonBaseSelect,
    });
  },

  async findMany({ where, skip, take, orderBy, select, tx }: { skip?: number; take?: number; where?: LessonWhereInput; orderBy?: LessonOrderByWithRelationInput; select?: LessonSelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [lessons, count] = await Promise.all([
      client.lesson.findMany({ where, skip, take, orderBy, select: select ?? lessonBaseSelect }),
      client.lesson.count({ where }),
    ]);

    return { lessons, count };
  },

  async validateLessonConflict({ captainId, carId, clientId, startTime, endTime, id, tx }: { captainId: string; carId: string; clientId: string; startTime: Date; endTime: Date; id?: string; tx?: TransactionClient }) {
    const where: LessonWhereInput = {
      status: "SCHEDULED",
      startTime: { lt: endTime },
      endTime: { gt: startTime },
      OR: [{ captainId }, { carId }, { clientId }],
    };

    if (id) {
      where.id = { not: id };
    }
    return await getClient(tx).lesson.findFirst({ where });
  },

  async count({ where, tx }: { where?: LessonWhereInput; tx?: TransactionClient }) {
    const client = getClient(tx);
    return await client.lesson.count({ where })
  }
};

export default LessonRepository;