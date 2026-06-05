import { Prisma } from "../../../prisma/generated/client";
import { prisma } from "../../lib/prisma";
import { areaBaseSelect } from "./area.selectors";

export const findAreaById = async (id: string) => {
  return await prisma.area.findUnique({
    where: { id },
    select: areaBaseSelect,
  });
};

export const findAreaByName = async (name: string) => {
  return await prisma.area.findUnique({
    where: { name },
    select: areaBaseSelect,
  });
};

export const findManyArea = async ({
  where,
  skip,
  take,
  orderBy,
}: {
  where?: Prisma.AreaWhereInput;
  skip?: number;
  take?: number;
  orderBy?: Prisma.AreaOrderByWithRelationInput;
}) => {
  const [areas, count] = await prisma.$transaction([
    prisma.area.findMany({ where, select: areaBaseSelect }),
    prisma.area.count({ where }),
  ]);
  return { areas, count };
};

export const createArea = async ({
  data,
}: {
  data: Prisma.AreaCreateInput;
}) => {
  return await prisma.area.create({
    data,
  });
};

export const update = async ({
  id,
  data,
}: {
  id: string;
  data: Prisma.AreaUpdateInput;
}) => {
  return await prisma.area.update({
    where: { id },
    data,
    select: areaBaseSelect,
  });
};

export const remove = async (id: string) => {
  return await prisma.area.delete({
    where: { id },
    select: areaBaseSelect,
  });
};
