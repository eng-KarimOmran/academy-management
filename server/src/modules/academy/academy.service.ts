import * as DTO from "./academy.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPaginationParams } from "../../shared/utils/Pagination";

import {
  createAcademy,
  findAcademyByPhoneOrName,
  findManyAcademy,
  findAcademyById,
  updateAcademy,
  deleteAcademy,
  addOwnerAcademy,
  deleteOwnerAcademy,
  addSocialMediaAcademy,
  deleteSocialMediaAcademy,
} from "./academy.repository";

import { findUserById, findUserByPhone } from "../user/user.repository";
import {
  AcademyCreateInput,
  AcademyUpdateInput,
} from "../../../prisma/generated/models";

import { buildAcademyWhere, checkAcademyUpdateConflict } from "./academy.utils";

import { Academy, Platform, User } from "../../../prisma/generated/client";

export const create = async (dataSafe: DTO.CreateAcademyDto) => {
  const { body } = dataSafe;
  const { name, address, phone, paymentLink, owner } = body;

  const academyExists = await findAcademyByPhoneOrName({ name, phone });

  if (academyExists) {
    if (academyExists.name === name) throw ApiError.Conflict("Name");
    throw ApiError.Conflict("Phone");
  }

  const user = await findUserByPhone({ phone: owner });

  if (!user) throw ApiError.NotFound({ model: "User" });

  const data: AcademyCreateInput = {
    name,
    address,
    phone,
    paymentLink,
    owners: {
      connect: [{ id: user.id }],
    },
  };

  return await createAcademy({ data, userOwner: user });
};

export const getAll = async (dataSafe: DTO.GetAllAcademiesDto) => {
  const { query } = dataSafe;
  const { limit, page, search } = query;

  const where = buildAcademyWhere({ search });

  const { academies, count } = await findManyAcademy({
    where,
    skip: Math.min(0, page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const { safePage, totalPages } = getPaginationParams({
    limit,
    page,
    count,
  });

  const pagination = { limit, page: safePage, totalPages, total: count };

  return {
    items: academies,
    pagination,
  };
};

export const update = async (
  dataSafe: DTO.UpdateAcademyDto,
  academy: Academy,
) => {
  const { body, params } = dataSafe;
  const { academyId } = params;
  const { name, phone, ...data } = body;

  const safeUpdateData = await checkAcademyUpdateConflict({
    academyId,
    currentName: academy.name,
    currentPhone: academy.phone,
    name,
    phone,
  });

  const updateData: AcademyUpdateInput = {
    ...data,
    ...safeUpdateData,
  };

  return await updateAcademy(academyId, updateData);
};

export const getDetails = async (dataSafe: DTO.GetAcademyDetailsDto) => {
  const { params } = dataSafe;
  const { academyId } = params;

  const academy = await findAcademyById(academyId);

  if (!academy) throw ApiError.NotFound({ model: "Academy" });

  return academy;
};

export const remove = async (academy: Academy) => {
  return await deleteAcademy({ academy });
};

export const addOwner = async ({
  academy,
  phone,
}: {
  academy: Academy;
  phone: string;
}) => {
  const user = await findUserByPhone({ phone });

  if (!user) throw ApiError.NotFound({ model: "User" });

  return await addOwnerAcademy({ academy, user });
};

export const deleteOwner = async ({
  academy,
  userId,
}: {
  academy: Academy;
  userId: string;
}) => {
  const user = await findUserById({ id: userId });

  if (!user) throw ApiError.NotFound({ model: "User" });

  return await deleteOwnerAcademy({ academy, user });
};

export const addSocialMedia = async ({
  academy,
  platform,
  url,
}: {
  academy: Academy;
  platform: Platform;
  url: string;
}) => {
  const academyId = academy.id;
  return await addSocialMediaAcademy({ academyId, platform, url });
};

export const deleteSocialMedia = async ({
  academy,
  platformId,
}: {
  academy: Academy;
  platformId: string;
}) => {
  const academyId = academy.id;
  return await deleteSocialMediaAcademy({ academyId, platformId });
};
