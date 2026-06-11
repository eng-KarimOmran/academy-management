import * as DTO from "./captain.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { Prisma } from "../../../prisma/generated/client";
import UserRepository from "../user/user.repository";
import UserService from "../user/user.service";
import CaptainRepository from "./captain.repository";
import { buildCaptainWhere } from "./captain.utils";
import { userDetailsSelect } from "../user/user.selectors";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";

const CaptainService = {
  async create(dataSafe: DTO.CreateDto) {
    const { phone, trainingType, captainLessonPrice } = dataSafe.body;

    const user = await UserRepository.findByPhone({ phone, select: userDetailsSelect });
    if (!user) throw ApiError.NotFound({ model: "User" });

    if (user.captainProfile) {
      throw ApiError.Conflict("CaptainProfile");
    }

    return await prisma.$transaction(async (tx) => {
      const captain = await CaptainRepository.create({
        data: {
          captainLessonPrice,
          trainingType,
          user: { connect: { id: user.id } },
        },
        tx
      });

      await UserService.recalculateUserRole({ userId: user.id, tx });

      return captain;
    });
  },

  async update(dataSafe: DTO.UpdateDto) {
    const { body, params } = dataSafe;
    const { captainId } = params;

    const captainExists = await CaptainRepository.findById({ captainId });
    if (!captainExists) throw ApiError.NotFound({ model: "Captain" });

    const { isActive, ...data } = body;
    const updateData: Prisma.CaptainUpdateInput = data;

    if (typeof isActive !== "undefined") {
      updateData.isActive = isActive;
    }

    return await CaptainRepository.update({ captainId, data: updateData });
  },

  async getAll(dataSafe: DTO.GetAllDto) {
    const { limit, page, search, isActive, trainingType } = dataSafe.query;

    const where = buildCaptainWhere({ search, isActive, trainingType });
    const { take, skip } = getPagination({ page, limit });

    const { captains, count } = await CaptainRepository.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, totalPages, total: count };

    return { items: captains, pagination };
  },

  async remove(dataSafe: DTO.DeleteDto) {
    const { captainId } = dataSafe.params;

    const captainExists = await CaptainRepository.findById({ captainId });
    if (!captainExists) throw ApiError.NotFound({ model: "Captain" });

    return await prisma.$transaction(async (tx) => {
      const deletedCaptain = await CaptainRepository.delete({ captainId, tx });
      await UserService.recalculateUserRole({ userId: captainExists.userId, tx });
      return deletedCaptain;
    });
  },

  async getDetails(dataSafe: DTO.GetDetailsDto) {
    const { captainId } = dataSafe.params;

    const captain = await CaptainRepository.findById({ captainId });
    if (!captain) throw ApiError.NotFound({ model: "Captain" });

    return captain;
  },

  async getLessonsCaptain(dataSafe: DTO.GetLessonCaptainDto) {
    const { params, query } = dataSafe;
    const { userId } = params;
    let { gte, lte } = query;

    const captain = await CaptainRepository.findByUserId({ userId });
    if (!captain) throw ApiError.NotFound({ model: "Captain" });

    if (!gte || !lte) {
      gte = dayjs().startOf("day").toDate();
      lte = dayjs().endOf("day").toDate();
    }

    return await CaptainRepository.getLessonsByCaptainId({
      captainId: captain.id,
      gte,
      lte,
    });
  }
};

export default CaptainService;