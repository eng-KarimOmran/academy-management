import {
  UserCreateInput,
  UserOrderByWithRelationInput,
  UserSelect,
  UserUpdateInput,
  UserWhereInput,
} from "../../../prisma/generated/models";

import { prisma } from "../../lib/prisma";
import { userBaseSelect } from "./user.selectors";

export const findUserById = async ({
  id,
  select = userBaseSelect,
}: {
  id: string;
  select?: UserSelect;
}) => {
  return await prisma.user.findUnique({
    where: { id },
    select,
  });
};

export const findUserByPhone = async ({
  phone,
  select = userBaseSelect,
}: {
  phone: string;
  select?: UserSelect;
}) => {
  return await prisma.user.findUnique({
    where: { phone },
    select,
  });
};

export const createUser = async (data: UserCreateInput) => {
  return await prisma.user.create({
    data,
    select: userBaseSelect,
  });
};

export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: UserUpdateInput;
}) => {
  return await prisma.user.update({
    where: { id },
    data,
    select: userBaseSelect,
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({ where: { id }, select: userBaseSelect });
};

export const findManyUsers = async (data: {
  where: UserWhereInput;
  skip: number;
  take: number;
  orderBy: UserOrderByWithRelationInput;
}) => {
  const [users, count] = await prisma.$transaction([
    prisma.user.findMany({ ...data, select: userBaseSelect }),
    prisma.user.count({ where: data.where }),
  ]);

  return { users, count };
};
