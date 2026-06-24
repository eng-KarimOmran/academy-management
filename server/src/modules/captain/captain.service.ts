import { buildCaptainWhere } from './captain.utils';
import { CaptainCreateInput, TransactionClient } from './../../../prisma/generated/internal/prismaNamespace';
import * as DTO from "./captain.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { Prisma, Captain } from "../../../prisma/generated/client";
import UserService from "../user/user.service";
import { userDetailsSelect } from "../user/user.selectors";
import { prisma } from "../../lib/prisma";
import { CaptainBaseSelect } from './captain.selectors';

interface ICaptainService {
  create: (data: { dataSafe: DTO.CreateDto; tx?: TransactionClient }) => Promise<Captain>;
  update: (data: { dataSafe: DTO.UpdateDto; tx?: TransactionClient }) => Promise<Captain>;
  getAll: (data: { dataSafe: DTO.GetAllDto; tx?: TransactionClient }) => Promise<{ items: Captain[]; pagination: { limit: number; page: number; totalPages: number; total: number } }>;
  delete: (data: { dataSafe: DTO.DeleteDto; tx?: TransactionClient }) => Promise<Captain>;
  getDetails: (data: { dataSafe: DTO.GetDetailsDto; tx?: TransactionClient }) => Promise<Captain>;
}

const CaptainService: ICaptainService = {
  async create({ dataSafe, tx }) {
    const { academyId } = dataSafe.params;
    const { userId, ...body } = dataSafe.body;

    const run = async (tx: TransactionClient) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: userDetailsSelect
      });

      if (!user) throw ApiError.NotFound({ model: "User" });

      if (user.captainProfile) {
        throw ApiError.Conflict('CaptainProfile');
      }

      const dataCaptain: CaptainCreateInput = {
        ...body,
        academy: { connect: { id: academyId } },
        user: { connect: { id: user.id } },
      }

      const captain = await tx.captain.create({
        data: dataCaptain,
        select: CaptainBaseSelect
      });

      await UserService.recalculateUserRole({ userId: user.id, tx });

      return captain;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async update({ dataSafe, tx }) {
    const { body, params } = dataSafe;
    const { captainId } = params;

    const run = async (tx: TransactionClient) => {
      const captainExists = await tx.captain.findUnique({ where: { id: captainId } });
      if (!captainExists) throw ApiError.NotFound({ model: "Captain" });

      const { isActive, ...data } = body;
      const updateData: Prisma.CaptainUpdateInput = data;

      if (typeof isActive !== "undefined") {
        updateData.isActive = isActive;
      }

      return await tx.captain.update({
        where: { id: captainId },
        data: updateData,
        select: CaptainBaseSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getAll({ dataSafe, tx }) {
    const { limit, page, search, isActive, supportType } = dataSafe.query;
    const { academyId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const { take, skip } = getPagination({ page, limit });

      const where = buildCaptainWhere({ search, isActive, supportType, academyId })

      const [captains, count] = await Promise.all([
        tx.captain.findMany({
          where,
          take,
          skip,
          orderBy: { createdAt: "desc" },
          select: CaptainBaseSelect
        }),
        tx.captain.count({ where })
      ]);

      const totalPages = getTotalPages({ limit, count });
      const pagination = { limit, page, totalPages, total: count };

      return { items: captains, pagination };
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async delete({ dataSafe, tx }) {
    const { captainId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const captainExists = await tx.captain.findUnique({ where: { id: captainId } });
      if (!captainExists) throw ApiError.NotFound({ model: "Captain" });

      const deletedCaptain = await tx.captain.delete({ where: { id: captainId }, select: CaptainBaseSelect });

      await UserService.recalculateUserRole({ userId: captainExists.userId, tx });

      return deletedCaptain;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getDetails({ dataSafe, tx }) {
    const { captainId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const captain = await tx.captain.findUnique({
        where: { id: captainId },
        select: CaptainBaseSelect
      });
      if (!captain) throw ApiError.NotFound({ model: "Captain" });

      return captain;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },
};

export default CaptainService;