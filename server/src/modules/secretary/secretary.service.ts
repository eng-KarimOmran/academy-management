import { TransactionClient } from './../../../prisma/generated/internal/prismaNamespace';
import * as DTO from "./secretary.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { Prisma, Secretary } from "../../../prisma/generated/client";
import { prisma } from "../../lib/prisma";
import { buildSecretaryWhere } from "./secretary.utils";
import { userDetailsSelect } from "../user/user.selectors";
import { secretaryBaseSelect } from "./secretary.selectors";
import UserService from "../user/user.service";

interface ISecretaryService {
  create: (data: { dataSafe: DTO.CreateDto; tx?: TransactionClient }) => Promise<Secretary>;
  update: (data: { dataSafe: DTO.UpdateDto; tx?: TransactionClient }) => Promise<Secretary>;
  getAll: (data: { dataSafe: DTO.GetAllDto; tx?: TransactionClient }) => Promise<{ items: Secretary[]; pagination: { limit: number; page: number; totalPages: number; total: number } }>;
  delete: (data: { dataSafe: DTO.DeleteDto; tx?: TransactionClient }) => Promise<Secretary>;
  getDetails: (data: { dataSafe: DTO.GetDetailsDto; tx?: TransactionClient }) => Promise<Secretary>;
}

const SecretaryService: ISecretaryService = {
  async create({ dataSafe, tx }) {
    const { userId, baseSalary, bonusAmount, targetCount } = dataSafe.body;
    const { academyId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const user = await tx.user.findUnique({ where: { id: userId }, select: userDetailsSelect });
      if (!user) throw ApiError.NotFound({ model: "User" });

      if (user.secretaryProfile) {
        throw ApiError.Conflict("SecretaryProfile");
      }

      const secretary = await tx.secretary.create({
        data: {
          baseSalary,
          bonusAmount,
          targetCount,
          academy: { connect: { id: academyId } },
          user: { connect: { id: user.id } },
        },
        select: secretaryBaseSelect
      });

      await UserService.recalculateUserRole({ userId: user.id, tx });

      return secretary;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async update({ dataSafe, tx }) {
    const { body, params } = dataSafe;
    const { secretaryId } = params;

    const run = async (tx: TransactionClient) => {
      const secretaryExists = await tx.secretary.findUnique({ where: { id: secretaryId } });
      if (!secretaryExists) throw ApiError.NotFound({ model: "Secretary" });

      const updateData: Prisma.SecretaryUpdateInput = body;

      return await tx.secretary.update({
        where: { id: secretaryId },
        data: updateData,
        select: secretaryBaseSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getAll({ dataSafe, tx }) {
    const { academyId } = dataSafe.params;
    const { limit, page, search } = dataSafe.query;

    const run = async (tx: TransactionClient) => {
      const { take, skip } = getPagination({ page, limit });

      const where = buildSecretaryWhere({ search, academyId });

      const [secretaries, count] = await Promise.all([
        tx.secretary.findMany({
          where,
          take,
          skip,
          orderBy: { createdAt: "desc" },
          select: secretaryBaseSelect
        }),
        tx.secretary.count({ where })
      ]);

      const totalPages = getTotalPages({ limit, count });
      const pagination = { limit, page, totalPages, total: count };

      return { items: secretaries, pagination };
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async delete({ dataSafe, tx }) {
    const { secretaryId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const secretaryExists = await tx.secretary.findUnique({
        where: { id: secretaryId },
        select: { userId: true }
      });
      if (!secretaryExists) throw ApiError.NotFound({ model: "Secretary" });

      const deletedSecretary = await tx.secretary.delete({
        where: { id: secretaryId },
        select: secretaryBaseSelect
      });

      await UserService.recalculateUserRole({ userId: secretaryExists.userId, tx });

      return deletedSecretary;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getDetails({ dataSafe, tx }) {
    const { secretaryId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const secretary = await tx.secretary.findUnique({
        where: { id: secretaryId },
        select: secretaryBaseSelect
      });
      if (!secretary) throw ApiError.NotFound({ model: "Secretary" });

      return secretary;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  }
};

export default SecretaryService;