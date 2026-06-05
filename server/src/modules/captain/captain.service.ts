import * as DTO from "./captain.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPaginationParams } from "../../shared/utils/Pagination";
import { Prisma } from "../../../prisma/generated/client";

import { findUserById, findUserByPhone } from "../user/user.repository";

import {
  createCaptain,
  findCaptainById,
  updateCaptain,
  findManyCaptain,
  removeCaptain,
} from "./captain.repository";
import { buildCaptainWhere } from "./captain.utils";
import { userBaseSelect, userDetailsSelect } from "../user/user.selectors";

export const create = async (dataSafe: DTO.CreateDto) => {
  const { body } = dataSafe;
  const { phone, trainingType, captainLessonPrice } = body;

  const user = await findUserByPhone({ phone, select: userDetailsSelect });
  if (!user) throw ApiError.NotFound({ model: "User" });

  if (user.captainProfile) {
    throw ApiError.Conflict("CaptainProfile");
  }

  return await createCaptain({
    data: {
      captainLessonPrice,
      trainingType,
      user: {
        connect: { id: user.id },
      },
    },
    user,
  });
};

export const update = async (dataSafe: DTO.UpdateDto) => {
  const { body, params } = dataSafe;
  const { captainId } = params;

  const captainExists = await findCaptainById(captainId);
  if (!captainExists) throw ApiError.NotFound({ model: "Captain" });

  const { isActive, ...data } = body;

  const updateData: Prisma.CaptainUpdateInput = data;

  if (typeof isActive !== "undefined") {
    updateData.isActive = isActive;
  }

  return await updateCaptain({ id: captainId, data: updateData });
};

export const getAll = async (dataSafe: DTO.GetAllDto) => {
  const { query } = dataSafe;
  const { limit, page, search, isActive, trainingType } = query;

  const where = buildCaptainWhere({ search, isActive, trainingType });

  const { captains, count } = await findManyCaptain({
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

  return { items: captains, pagination };
};

export const remove = async (dataSafe: DTO.DeleteDto) => {
  const { params } = dataSafe;
  const { captainId } = params;

  const captainExists = await findCaptainById(captainId);
  if (!captainExists) throw ApiError.NotFound({ model: "Captain" });

  const user = await findUserById({ id: captainExists.user.id });
  if (!user) throw ApiError.NotFound({ model: "User" });

  return await removeCaptain({ id: captainId, user });
};

export const getDetails = async (dataSafe: DTO.GetDetailsDto) => {
  const { captainId } = dataSafe.params;

  const captain = await findCaptainById(captainId);

  if (!captain) throw ApiError.NotFound({ model: "Captain" });

  return captain;
};