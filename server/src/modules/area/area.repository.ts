import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  AreaCreateInput,
  AreaOrderByWithRelationInput,
  AreaSelect,
  AreaUpdateInput,
  AreaWhereInput,
} from "../../../prisma/generated/models";
import { areaBaseSelect } from "./area.selectors";
import getClient from "../../shared/utils/getClient"

const AreaRepository = {
  async create({ data, select, tx }: { data: AreaCreateInput; select?: AreaSelect; tx?: TransactionClient }) {
    return getClient(tx).area.create({
      data,
      select: select ?? areaBaseSelect,
    });
  },

  async update({ areaId, data, select, tx }: { areaId: string; data: AreaUpdateInput; select?: AreaSelect; tx?: TransactionClient }) {
    return getClient(tx).area.update({
      where: { id: areaId },
      data,
      select: select ?? areaBaseSelect,
    });
  },

  async delete({ areaId, select, tx }: { areaId: string; select?: AreaSelect; tx?: TransactionClient }) {
    return getClient(tx).area.delete({
      where: { id: areaId },
      select: select ?? areaBaseSelect,
    });
  },

  async findById({ areaId, select, tx }: { areaId: string; select?: AreaSelect; tx?: TransactionClient }) {
    return getClient(tx).area.findUnique({
      where: { id: areaId },
      select: select ?? areaBaseSelect,
    });
  },

  async findByName({ name, select, tx }: { name: string; select?: AreaSelect; tx?: TransactionClient }) {
    return getClient(tx).area.findUnique({
      where: { name },
      select: select ?? areaBaseSelect,
    });
  },

  async findMany({ where, skip, take, orderBy, select, tx }: { skip?: number; take?: number; where?: AreaWhereInput; orderBy?: AreaOrderByWithRelationInput; select?: AreaSelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [areas, count] = await Promise.all([
      client.area.findMany({ where, skip, take, orderBy, select: select ?? areaBaseSelect }),
      client.area.count({ where })
    ]);
    return { areas, count };
  },
};

export default AreaRepository;