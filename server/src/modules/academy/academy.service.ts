import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { AcademyCreateInput, AcademyUpdateInput } from "../../../prisma/generated/models";
import { buildAcademyWhere } from "./academy.utils";
import { Platform } from "../../../prisma/generated/client";
import AcademyRepository from "./academy.repository";
import UserRepository from "../user/user.repository";
import { prisma } from "../../lib/prisma";
import { academyDetailsSelect, academyWithOwnersSelect } from "./academy.selector";
import { AcademyWithOwners } from "./academy.middleware";
import UserService from "../user/user.service";

const AcademyService = {
  async create({ name, phone, paymentLink, owner, address }: { name: string, address: string, phone: string, paymentLink: string, owner: string }) {
    return prisma.$transaction(async (tx) => {
      const existingAcademy = await AcademyRepository.findByNameOrPhone({ name, phone, tx });

      if (existingAcademy) {
        if (existingAcademy.name === name) throw ApiError.Conflict("Name");
        if (existingAcademy.phone === phone) throw ApiError.Conflict("Phone");
      }

      const user = await UserRepository.findByPhone({ phone: owner, tx });
      if (!user) throw ApiError.NotFound({ model: "User" });

      const data: AcademyCreateInput = {
        name,
        address,
        phone,
        paymentLink,
        owners: { connect: [{ id: user.id }] },
      };

      const newAcademy = await AcademyRepository.create({ data, tx });
      await UserService.recalculateUserRole({ userId: user.id, tx });
      0
      return newAcademy;
    });
  },

  async update({ academy, academyId, address, name, paymentLink, phone }: { academy?: AcademyWithOwners, academyId?: string, name?: string, phone?: string, address?: string, paymentLink?: string }) {
    const currentAcademy = academy ?? await AcademyRepository.findById({ academyId: academyId! });
    if (!currentAcademy) throw ApiError.NotFound({ model: "Academy" });

    const isNameChanged = name && name !== currentAcademy.name;
    const isPhoneChanged = phone && phone !== currentAcademy.phone;

    if (isNameChanged || isPhoneChanged) {
      const existingAcademy = await AcademyRepository.findByNameOrPhone({ name, phone, academyId: currentAcademy.id });
      if (existingAcademy) {
        if (isNameChanged && existingAcademy.name === name) throw ApiError.Conflict("Name");
        if (isPhoneChanged && existingAcademy.phone === phone) throw ApiError.Conflict("Phone");
      }
    }

    const data: AcademyUpdateInput = {};
    if (paymentLink) data.paymentLink = paymentLink;
    if (address) data.address = address;
    if (phone) data.phone = phone;
    if (name) data.name = name;

    return await AcademyRepository.update({ academyId: currentAcademy.id, data });
  },

  async delete({ academy, academyId }: { academy?: AcademyWithOwners, academyId?: string }) {
    return prisma.$transaction(async (tx) => {
      const currentAcademy = academy ?? await AcademyRepository.findById({ academyId: academyId || academy!.id, tx, select: academyWithOwnersSelect });
      if (!currentAcademy) throw ApiError.NotFound({ model: "Academy" });

      const deleteAcademy = await AcademyRepository.delete({ academyId: currentAcademy.id, tx });

      await Promise.all(currentAcademy.owners.map((user: { id: string }) => UserService.recalculateUserRole({ userId: user.id, tx })));
      0
      return deleteAcademy;
    });
  },

  async getDetails({ academyId }: { academyId: string }) {
    return await AcademyRepository.findById({ academyId, select: academyDetailsSelect });
  },

  async getAll({ limit, page, search }: { limit: number, page: number, search?: string }) {
    const where = buildAcademyWhere({ search });
    const { take, skip } = getPagination({ page, limit });

    const { academies, count } = await AcademyRepository.findMany({ where, take, skip, orderBy: { createdAt: "desc" } });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, totalPages, total: count };

    return { items: academies, pagination };
  },

  async addOwner({ academy, academyId, phone }: { academy?: AcademyWithOwners; academyId?: string; phone: string }) {
    return prisma.$transaction(async (tx) => {
      const currentAcademy = academy ?? await AcademyRepository.findById({ academyId: academyId || academy!.id, tx, select: academyWithOwnersSelect });
      if (!currentAcademy) throw ApiError.NotFound({ model: "Academy" });

      const user = await UserRepository.findByPhone({ phone, tx });
      if (!user) throw ApiError.NotFound({ model: "User" });

      const isUserOwner = currentAcademy.owners.some((u: { id: string }) => u.id === user.id);
      if (isUserOwner) throw ApiError.Conflict("OWNER");

      const academyUpdate = await AcademyRepository.update({ academyId: currentAcademy.id, data: { owners: { connect: { id: user.id } } }, tx });
      await UserService.recalculateUserRole({ userId: user.id, tx });
      0
      return academyUpdate;
    });
  },

  async deleteOwner({ academy, academyId, userId }: { academy?: AcademyWithOwners; academyId?: string; userId: string; }) {
    return prisma.$transaction(async (tx) => {
      const currentAcademy = academy ?? await AcademyRepository.findById({ academyId: academyId || academy!.id, tx });
      if (!currentAcademy) throw ApiError.NotFound({ model: "Academy" });

      const academyUpdate = await AcademyRepository.update({ academyId: currentAcademy.id, data: { owners: { disconnect: { id: userId } } }, tx });
      await UserService.recalculateUserRole({ userId, tx });
      0
      return academyUpdate;
    });
  },

  async addSocialMedia({ academy, academyId, platform, url }: { academy?: AcademyWithOwners; academyId?: string; url: string, platform: Platform }) {
    const currentAcademy = academy ?? await AcademyRepository.findById({ academyId: academyId || academy!.id });
    if (!currentAcademy) throw ApiError.NotFound({ model: "Academy" });

    return await AcademyRepository.update({ academyId: currentAcademy.id, data: { socialMediaPlatforms: { create: { platform, url } } } });
  },

  async deleteSocialMedia({ academy, academyId, platformId }: { academy?: AcademyWithOwners; academyId?: string; platformId: string; }) {
    const currentAcademy = academy ?? await AcademyRepository.findById({ academyId: academyId || academy!.id });
    if (!currentAcademy) throw ApiError.NotFound({ model: "Academy" });

    return await AcademyRepository.update({ academyId: currentAcademy.id, data: { socialMediaPlatforms: { delete: { id: platformId } } } });
  }
};

export default AcademyService;