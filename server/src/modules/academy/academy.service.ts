import { buildAcademyWhere, getAcademyOrThrow } from "./academy.utils";

import {
  AcademyCreateInput,
  AcademyUpdateInput,
} from "./../../../prisma/generated/internal/prismaNamespace";

import ApiError from "../../shared/utils/ApiError";
import { prisma } from "../../lib/prisma";
import { IAcademyService } from "./academy.type";
import AcademyRepository from "./academy.repository";
import UserRepository from "../user/user.repository";
import {
  buildPagination,
  buildPaginationMeta,
} from "../../shared/utils/Pagination";

const AcademyService: IAcademyService = {
  async create({ body }) {
    const { name, userId, phone } = body;

    return prisma.$transaction(async (tx) => {
      const [academyByName, academyByPhone, user] = await Promise.all([
        AcademyRepository.findByName(name, tx),
        AcademyRepository.findByPhone(phone, tx),
        UserRepository.findById(userId, tx),
      ]);

      if (academyByName) throw ApiError.Conflict("Name");
      if (academyByPhone) throw ApiError.Conflict("Phone");
      if (!user) throw ApiError.NotFound("User");

      const data: AcademyCreateInput = {
        name,
        phones: { create: { phone } },
        owners: { connect: { id: userId } },
      };

      const newAcademy = await AcademyRepository.create(data, tx);
      await UserRepository.recalculateUserRole(userId, tx);

      return newAcademy
    });
  },

  async update({ body, params }, academy) {
    const { academyId } = params;
    const { name } = body;

    return prisma.$transaction(async (tx) => {
      const academyEx = await getAcademyOrThrow(academyId, tx, academy);

      if (academyEx.name === name) return academyEx;

      const nameExists = await AcademyRepository.findByName(name, tx);
      if (nameExists) throw ApiError.Conflict("Name");

      const data: AcademyUpdateInput = { name };

      return AcademyRepository.update(academyId, data, tx);
    });
  },

  async delete({ params }, academy) {
    const { academyId } = params;

    return prisma.$transaction(async (tx) => {
      await getAcademyOrThrow(academyId, tx, academy);
      return AcademyRepository.delete(academyId, tx);
    });
  },

  async getAll({ query }) {
    const { limit, page, search } = query;

    const where = buildAcademyWhere({ search });
    const { take, skip } = buildPagination({ page, limit });

    const { academies, count } = await prisma.$transaction(async (tx) => {
      const [list, total] = await Promise.all([
        AcademyRepository.findAll({ where, take, skip }, tx),
        AcademyRepository.count(where, tx),
      ]);

      return { academies: list, count: total };
    });

    const pagination = buildPaginationMeta({ limit, count, page });

    return { items: academies, pagination };
  },

  async getDetails({ params }, academy) {
    const { academyId } = params;

    return prisma.$transaction(async (tx) => {
      return getAcademyOrThrow(academyId, tx, academy);
    });
  },

  async addAddress({ body, params }, academy) {
    const { academyId } = params;
    const { address } = body;

    return prisma.$transaction(async (tx) => {
      const academyEx = await getAcademyOrThrow(academyId, tx, academy);

      const exists = academyEx.addresses.some((a) => a.address === address);

      if (exists) {
        throw ApiError.Conflict("Address");
      }

      return AcademyRepository.addAddress(academyId, address, tx);
    });
  },

  async deleteAddress({ params }, academy) {
    const { academyId, addressId } = params;

    return prisma.$transaction(async (tx) => {
      const academyEx = await getAcademyOrThrow(academyId, tx, academy);

      const exists = academyEx.addresses.some((a) => a.id === addressId);

      if (!exists) {
        throw ApiError.NotFound("Address");
      }

      return AcademyRepository.deleteAddress(academyId, addressId, tx);
    });
  },

  async addPhone({ body, params }, academy) {
    const { academyId } = params;
    const { phone } = body;

    return prisma.$transaction(async (tx) => {
      const academyEx = await getAcademyOrThrow(academyId, tx, academy);

      const existsInAcademy = academyEx.phones.some((p) => p.phone === phone);

      if (existsInAcademy) {
        throw ApiError.Conflict("Phone");
      }

      const existsGlobally = await AcademyRepository.findByPhone(phone, tx);

      if (existsGlobally) {
        throw ApiError.Conflict("Phone");
      }

      return AcademyRepository.addPhone(academyId, phone, tx);
    });
  },

  async deletePhone({ params }, academy) {
    const { academyId, phoneId } = params;

    return prisma.$transaction(async (tx) => {
      const academyEx = await getAcademyOrThrow(academyId, tx, academy);

      const exists = academyEx.phones.some((p) => p.id === phoneId);

      if (!exists) {
        throw ApiError.NotFound("Phone");
      }

      return AcademyRepository.deletePhone(academyId, phoneId, tx);
    });
  },

  async addSocialMedia({ body, params }, academy) {
    const { academyId } = params;
    const { platform, url } = body;

    return prisma.$transaction(async (tx) => {
      const academyEx = await getAcademyOrThrow(academyId, tx, academy);

      const exists = academyEx.socialMedia.some(
        (s) => s.platform === platform && s.url === url
      );

      if (exists) {
        throw ApiError.Conflict("SocialMedia");
      }

      return AcademyRepository.addSocialMedia(academyId, { platform, url }, tx);
    });
  },

  async deleteSocialMedia({ params }, academy) {
    const { academyId, socialMediaId } = params;

    return prisma.$transaction(async (tx) => {
      const academyEx = await getAcademyOrThrow(academyId, tx, academy);

      const exists = academyEx.socialMedia.some((s) => s.id === socialMediaId);

      if (!exists) {
        throw ApiError.NotFound("SocialMedia");
      }

      return AcademyRepository.deleteSocialMedia(academyId, socialMediaId, tx);
    });
  },

  async addOwner({ params }, academy) {
    const { academyId, userId } = params;

    return prisma.$transaction(async (tx) => {
      const academyEx = await getAcademyOrThrow(academyId, tx, academy);

      const exists = academyEx.owners.some((o) => o.id === userId);

      if (exists) {
        throw ApiError.Conflict("OWNER_ALREADY_EXISTS");
      }

      const user = await UserRepository.findById(userId, tx);

      if (!user) throw ApiError.NotFound("User");

      const result = await AcademyRepository.addOwner(academyId, userId, tx);

      await UserRepository.recalculateUserRole(userId, tx);

      return result;
    });
  },

  async deleteOwner({ params }, academy) {
    const { academyId, userId } = params;

    return prisma.$transaction(async (tx) => {
      const academyEx = await getAcademyOrThrow(academyId, tx, academy);

      const exists = academyEx.owners.some((o) => o.id === userId);

      if (!exists) {
        throw ApiError.NotFound("User");
      }

      const result = await AcademyRepository.removeOwner(academyId, userId, tx);

      await UserRepository.recalculateUserRole(userId, tx);

      return result;
    });
  },

  async myAcademics({ userId }) {
    return AcademyRepository.findAll({
      where: { owners: { some: { id: userId } } },
    });
  },
};

export default AcademyService;