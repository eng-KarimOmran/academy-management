import {
  Academy,
  Platform,
  Role,
  User,
} from "../../../prisma/generated/client";

import {
  AcademyCreateInput,
  AcademyOrderByWithRelationInput,
  AcademyUpdateInput,
  AcademyWhereInput,
} from "../../../prisma/generated/models";

import { prisma } from "../../lib/prisma";

import { RoleService } from "../../shared/services/role.service";
import ApiError from "../../shared/utils/ApiError";

import { academyBaseSelect, academyDetailsSelect } from "./academy.selector";

// ==========================================
// Academy Repository
// ==========================================

export const createAcademy = async ({
  data,
  userOwner,
}: {
  data: AcademyCreateInput;
  userOwner: User;
}) => {
  const [academy] = await prisma.$transaction([
    prisma.academy.create({ data, select: academyBaseSelect }),
    RoleService.addRole(userOwner, Role.OWNER),
  ]);
  return academy;
};

export const updateAcademy = async (
  academyId: string,
  data: AcademyUpdateInput,
) => {
  return await prisma.academy.update({
    where: { id: academyId },
    data,
    select: academyBaseSelect,
  });
};

export const deleteAcademy = async ({ academy }: { academy: Academy }) => {
  return await prisma.$transaction(async (tx) => {
    const academyDelete = await tx.academy.delete({
      where: { id: academy.id },
      select: academyDetailsSelect,
    });

    await Promise.all(
      academyDelete.owners.map(async (owner) => {
        const user = await tx.user.findUnique({ where: { id: owner.id } });
        if (user) {
          await RoleService.removeRole(user, Role.OWNER, tx);
        }
      }),
    );

    return academyDelete;
  });
};

export const findAcademyById = async (academyId: string) => {
  return await prisma.academy.findUnique({
    where: { id: academyId },
    select: academyDetailsSelect,
  });
};

export const findAcademyByOwner = async ({
  academyId,
  ownerId,
}: {
  academyId: string;
  ownerId: string;
}) => {
  return await prisma.academy.findUnique({
    where: { id: academyId, owners: { some: { id: ownerId } } },
    select: academyBaseSelect,
  });
};

export const findAcademyByPhoneOrName = async ({
  academyId,
  name,
  phone,
}: {
  name?: string;
  phone?: string;
  academyId?: string;
}) => {
  const where: AcademyWhereInput = {};

  if (academyId) {
    where.NOT = { id: academyId };
  }

  if (name || phone) {
    where.OR = [{ name }, { phone }];
  }

  return await prisma.academy.findFirst({ where, select: academyBaseSelect });
};

export const findManyAcademy = async ({
  where,
  skip,
  take,
  orderBy,
}: {
  skip: number;
  take: number;
  where: AcademyWhereInput;
  orderBy: AcademyOrderByWithRelationInput;
}) => {
  const [academies, count] = await prisma.$transaction([
    prisma.academy.findMany({
      where,
      skip,
      take,
      orderBy,
      select: academyBaseSelect,
    }),
    prisma.academy.count({ where }),
  ]);

  return { academies, count };
};

// ==========================================
// Social Media Repository
// ==========================================

export const addSocialMediaAcademy = async ({
  academyId,
  platform,
  url,
}: {
  academyId: string;
  platform: Platform;
  url: string;
}) => {
  await prisma.academy.update({
    where: { id: academyId },
    data: {
      socialMediaPlatforms: {
        create: {
          platform,
          url,
        },
      },
    },
  });
};

export const deleteSocialMediaAcademy = async ({
  academyId,
  platformId,
}: {
  academyId: string;
  platformId: string;
}) => {
  await prisma.academy.update({
    where: { id: academyId },
    data: {
      socialMediaPlatforms: {
        delete: {
          id: platformId,
        },
      },
    },
  });
};

// ==========================================
// Owner Repository
// ==========================================

export const addOwnerAcademy = async ({
  academy,
  user,
}: {
  academy: Academy;
  user: User;
}) => {
  const [academyUpdate] = await prisma.$transaction([
    prisma.academy.update({
      where: { id: academy.id },
      data: {
        owners: {
          connect: {
            id: user.id,
          },
        },
      },
    }),
    RoleService.addRole(user, Role.OWNER),
  ]);

  return academyUpdate;
};

export const deleteOwnerAcademy = async ({
  academy,
  user,
}: {
  academy: Academy;
  user: User;
}) => {
  return prisma.$transaction(async (tx) => {
    const ownersAcademy = await tx.academy.findUnique({
      where: { id: academy.id },
      select: { owners: { select: { id: true } } },
    });

    if (!ownersAcademy || ownersAcademy.owners.length <= 1) {
      throw ApiError.BadRequest("لا يمكن ان يكون عدد الملاك اقل من واحد");
    }

    const academyUpdate = await tx.academy.update({
      where: { id: academy.id },
      data: {
        owners: {
          disconnect: {
            id: user.id,
          },
        },
      },
    });
    await RoleService.removeRole(user, Role.OWNER, tx);
    return academyUpdate;
  });
};
