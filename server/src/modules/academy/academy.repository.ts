import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  AcademyCreateInput,
  AcademyOrderByWithRelationInput,
  AcademySelect,
  AcademyUpdateInput,
  AcademyWhereInput,
} from "../../../prisma/generated/models";
import { academyBaseSelect } from "./academy.selector";
import getClient from "../../shared/utils/getClient"

const AcademyRepository = {
  async create({ data, select, tx }: { data: AcademyCreateInput; select?: AcademySelect; tx?: TransactionClient }) {
    return getClient(tx).academy.create({
      data,
      select: select ?? academyBaseSelect,
    });
  },

  async update({ academyId, data, select, tx }: { academyId: string; data: AcademyUpdateInput; select?: AcademySelect; tx?: TransactionClient }) {
    return getClient(tx).academy.update({
      where: { id: academyId },
      data,
      select: select ?? academyBaseSelect,
    });
  },

  async delete({ academyId, select, tx }: { academyId: string; select?: AcademySelect; tx?: TransactionClient }) {
    return getClient(tx).academy.delete({
      where: { id: academyId },
      select: select ?? academyBaseSelect,
    });
  },

  async findById({ academyId, select, tx }: { academyId: string; select?: AcademySelect; tx?: TransactionClient }) {
    return getClient(tx).academy.findUnique({
      where: { id: academyId },
      select: select ?? academyBaseSelect,
    });
  },

  async findMany({ where, skip, take, orderBy, select, tx }: { skip?: number; take?: number; where?: AcademyWhereInput; orderBy?: AcademyOrderByWithRelationInput; select?: AcademySelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [academies, count] = await Promise.all([
      client.academy.findMany({ where, skip, take, orderBy, select: select ?? academyBaseSelect }),
      client.academy.count({ where })
    ]);
    return { academies, count };
  },

  async findByNameOrPhone({ academyId, name, phone, select, tx }: { name?: string, phone?: string, academyId?: string, select?: AcademySelect; tx?: TransactionClient }) {
    const where: AcademyWhereInput = {};
    const OR: AcademyWhereInput[] = [];
    if (name) OR.push({ name });
    if (phone) OR.push({ phone });
    if (academyId) where.NOT = { id: academyId };
    if (OR.length > 0) where.OR = OR;

    return getClient(tx).academy.findFirst({
      where,
      select: select ?? academyBaseSelect
    });
  }
};

export default AcademyRepository;