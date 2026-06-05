import { RoleService } from "../../shared/services/role.service";
import { User } from "../../../prisma/generated/client";
import {
  SecretaryCreateInput,
  SecretaryOrderByWithRelationInput,
  SecretaryUpdateInput,
  SecretaryWhereInput,
} from "../../../prisma/generated/models";

import { prisma } from "../../lib/prisma";
import { secretaryBaseSelect } from "./secretary.selectors";

export const findSecretaryById = async (id: string) => {
  return await prisma.secretary.findUnique({
    where: { id },
    select: secretaryBaseSelect,
  });
};

export const findManySecretary = async ({
  where,
  skip,
  take,
  orderBy,
}: {
  where?: SecretaryWhereInput;
  skip?: number;
  take?: number;
  orderBy?: SecretaryOrderByWithRelationInput;
}) => {
  const [secretaries, count] = await prisma.$transaction([
    prisma.secretary.findMany({
      where,
      select: secretaryBaseSelect,
      skip,
      take,
      orderBy,
    }),
    prisma.secretary.count({ where }),
  ]);
  return { secretaries, count };
};

export const createSecretary = async ({
  data,
  user,
}: {
  data: SecretaryCreateInput;
  user: User;
}) => {
  const [Secretary, userUpdate] = await prisma.$transaction([
    prisma.secretary.create({ data, select: secretaryBaseSelect }),
    RoleService.addRole(user, "SECRETARY"),
  ]);
  return { Secretary, userUpdate };
};

export const updateSecretary = async ({
  id,
  data,
}: {
  id: string;
  data: SecretaryUpdateInput;
}) => {
  return await prisma.secretary.update({
    where: { id },
    data,
    select: secretaryBaseSelect,
  });
};

export const removeSecretary = async ({
  id,
  user,
}: {
  id: string;
  user: User;
}) => {
  return await prisma.$transaction(async (tx)=>{
     const secretary =  await tx.secretary.delete({ where: { id } })
     RoleService.removeRole(user, "SECRETARY" , tx)
     return secretary
  });
};
