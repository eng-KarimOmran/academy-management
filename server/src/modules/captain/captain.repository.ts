import { RoleService } from "../../shared/services/role.service";
import { User } from "../../../prisma/generated/client";
import {
  CaptainCreateInput,
  CaptainOrderByWithRelationInput,
  CaptainUpdateInput,
  CaptainWhereInput,
} from "../../../prisma/generated/models";

import { prisma } from "../../lib/prisma";
import { CaptainBaseSelect } from "./captain.selectors";

export const findCaptainById = async (id: string) => {
  return await prisma.captain.findUnique({
    where: { id },
    select: CaptainBaseSelect,
  });
};

export const findManyCaptain = async ({
  where,
  skip,
  take,
  orderBy,
}: {
  where?: CaptainWhereInput;
  skip?: number;
  take?: number;
  orderBy?: CaptainOrderByWithRelationInput;
}) => {
  const [captains, count] = await prisma.$transaction([
    prisma.captain.findMany({
      where,
      select: CaptainBaseSelect,
      skip,
      take,
      orderBy,
    }),
    prisma.captain.count({ where }),
  ]);
  return { captains, count };
};

export const createCaptain = async ({
  data,
  user,
}: {
  data: CaptainCreateInput;
  user: User;
}) => {
  const [captain] = await prisma.$transaction([
    prisma.captain.create({ data, select: CaptainBaseSelect }),
    RoleService.addRole(user, "CAPTAIN"),
  ]);
  return { captain };
};

export const updateCaptain = async ({
  id,
  data,
}: {
  id: string;
  data: CaptainUpdateInput;
}) => {
  return await prisma.captain.update({
    where: { id },
    data,
    select: CaptainBaseSelect,
  });
};

export const removeCaptain = async ({
  id,
  user,
}: {
  id: string;
  user: User;
}) => {
  return await prisma.$transaction(async (tx) => {
    const captain = await tx.captain.delete({ where: { id } });
    await RoleService.removeRole(user, "CAPTAIN", tx);
    return captain;
  });
};
