import {
  ClientCreateInput,
  ClientOrderByWithRelationInput,
  ClientSelect,
  ClientUpdateInput,
  ClientWhereInput,
} from "../../../prisma/generated/models";
import { prisma } from "../../lib/prisma";
import { clientBaseSelect } from "./client.selectors";

export const createClient = async (data: ClientCreateInput) => {
  return await prisma.client.create({ data, select: clientBaseSelect });
};

export const findClientById = async ({
  id,
  select = clientBaseSelect,
}: {
  id: string;
  select?: ClientSelect;
}) => {
  return await prisma.client.findUnique({
    where: { id },
    select,
  });
};

export const findClientByPhone = async ({
  phone,
  academyId,
  select = clientBaseSelect,
}: {
  phone: string;
  academyId: string;
  select?: ClientSelect;
}) => {
  return await prisma.client.findUnique({
    where: {
      academyId_phone: {
        phone,
        academyId,
      },
    },
    select,
  });
};

export const updateClient = async ({
  id,
  data,
}: {
  id: string;
  data: ClientUpdateInput;
}) => {
  return await prisma.client.update({
    where: { id },
    data,
    select: clientBaseSelect,
  });
};

export const deleteClient = async (id: string) => {
  return await prisma.client.delete({
    where: { id },
    select: clientBaseSelect,
  });
};

export const findManyClients = async (data: {
  where: ClientWhereInput;
  skip: number;
  take: number;
  orderBy: ClientOrderByWithRelationInput;
}) => {
  const [clients, count] = await prisma.$transaction([
    prisma.client.findMany({ ...data, select: clientBaseSelect }),
    prisma.client.count({ where: data.where }),
  ]);

  return { clients, count };
};

export const getOtherFilesByPhone = async ({
  phone,
  academyId,
}: {
  academyId: string;
  phone: string;
}) => {
  return prisma.client.findMany({
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
};
