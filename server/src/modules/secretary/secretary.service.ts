import * as DTO from "./secretary.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPaginationParams } from "../../shared/utils/Pagination";
import { Prisma } from "../../../prisma/generated/client";

import { findUserById, findUserByPhone } from "../user/user.repository";

import {
  createSecretary,
  findSecretaryById,
  updateSecretary,
  findManySecretary,
  removeSecretary,
} from "./secretary.repository";

import { buildSecretaryWhere } from "./secretary.utils";

import { userDetailsSelect } from "../user/user.selectors";

export const create = async (dataSafe: DTO.CreateDto) => {
  const { body } = dataSafe;
  const { phone, baseSalary, bonusAmount, targetCount } = body;

  const user = await findUserByPhone({ phone, select: userDetailsSelect });
  if (!user) throw ApiError.NotFound({ model: "User" });

  if (user.secretaryProfile) {
    throw ApiError.Conflict("SecretaryProfile");
  }

  return await createSecretary({
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
};

export const update = async (dataSafe: DTO.UpdateDto) => {
  const { body, params } = dataSafe;
  const { secretaryId } = params;

  const secretaryExists = await findSecretaryById(secretaryId);
  if (!secretaryExists) throw ApiError.NotFound({ model: "Secretary" });

  const updateData: Prisma.SecretaryUpdateInput = body;

  return await updateSecretary({ id: secretaryId, data: updateData });
};

export const getAll = async (dataSafe: DTO.GetAllDto) => {
  const { query } = dataSafe;
  const { limit, page, search } = query;

  const where = buildSecretaryWhere({ search });

  const { secretaries, count } = await findManySecretary({
    where,
    take: limit,
    skip: Math.min(0, page - 1) * limit,
    orderBy: { createdAt: "desc" },
  });

  const { safePage, totalPages } = getPaginationParams({
    limit,
    page,
    count,
  });

  const pagination = { limit, page: safePage, total: count, totalPages };

  return { items: secretaries, pagination };
};

export const remove = async (dataSafe: DTO.DeleteDto) => {
  const { params } = dataSafe;
  const { secretaryId } = params;

  const secretaryExists = await findSecretaryById(secretaryId);
  if (!secretaryExists) throw ApiError.NotFound({ model: "Secretary" });

  const user = await findUserById({ id: secretaryExists.user.id });
  if (!user) throw ApiError.NotFound({ model: "User" });

  return await removeSecretary({ id: secretaryId, user });
};

export const getDetails = async (dataSafe: DTO.GetDetailsDto) => {
  const { secretaryId } = dataSafe.params;

  const Secretary = await findSecretaryById(secretaryId);

  if (!Secretary) throw ApiError.NotFound({ model: "Secretary" });

  return Secretary;
};
