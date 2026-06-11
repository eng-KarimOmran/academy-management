import * as DTO from "./secretary.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { Prisma } from "../../../prisma/generated/client";
import UserRepository from "../user/user.repository";
import SecretaryRepository from "./secretary.repository";
import { buildSecretaryWhere } from "./secretary.utils";
import { userDetailsSelect } from "../user/user.selectors";

const SecretaryService = {
  async create(dataSafe: DTO.CreateDto) {
    const { body } = dataSafe;
    const { phone, baseSalary, bonusAmount, targetCount } = body;

    const user = await UserRepository.findByPhone({ phone, select: userDetailsSelect });
    if (!user) throw ApiError.NotFound({ model: "User" });

    if (user.secretaryProfile) {
      throw ApiError.Conflict("SecretaryProfile");
    }

    return await SecretaryRepository.create({
      data: {
        baseSalary,
        bonusAmount,
        targetCount,
        user: {
          connect: { id: user.id },
        },
      },
      user,
    });
  },

  async update(dataSafe: DTO.UpdateDto) {
    const { body, params } = dataSafe;
    const { secretaryId } = params;

    const secretaryExists = await SecretaryRepository.findById({ id: secretaryId });
    if (!secretaryExists) throw ApiError.NotFound({ model: "Secretary" });

    const updateData: Prisma.SecretaryUpdateInput = body;

    return await SecretaryRepository.update({ id: secretaryId, data: updateData });
  },

  async getAll(dataSafe: DTO.GetAllDto) {
    const { query } = dataSafe;
    const { limit, page, search } = query;

    const where = buildSecretaryWhere({ search });
    const { take, skip } = getPagination({ page, limit });

    const { secretaries, count } = await SecretaryRepository.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, totalPages, total: count };

    return { items: secretaries, pagination };
  },

  async remove(dataSafe: DTO.DeleteDto) {
    const { params } = dataSafe;
    const { secretaryId } = params;

    const secretaryExists = await SecretaryRepository.findById({ id: secretaryId });
    if (!secretaryExists) throw ApiError.NotFound({ model: "Secretary" });

    const user = await UserRepository.findById({ userId: secretaryExists.user.id });
    if (!user) throw ApiError.NotFound({ model: "User" });

    return await SecretaryRepository.delete({ id: secretaryId, user });
  },

  async getDetails(dataSafe: DTO.GetDetailsDto) {
    const { secretaryId } = dataSafe.params;

    const secretary = await SecretaryRepository.findById({ id: secretaryId });
    if (!secretary) throw ApiError.NotFound({ model: "Secretary" });

    return secretary;
  }
};

export default SecretaryService;