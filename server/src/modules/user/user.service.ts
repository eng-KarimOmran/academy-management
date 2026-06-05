import * as DTO from "./user.dto";
import ApiError from "../../shared/utils/ApiError";
import HashHelper from "../../shared/utils/HashHelper";
import dayjs from "dayjs";
import { getPaginationParams } from "../../shared/utils/Pagination";
import { Prisma, User } from "../../../prisma/generated/client";
import * as repositoryUser from "./user.repository";
import { omit } from "../../shared/utils/omit";
import { assertCanModifyUser, buildUserWhere } from "./user.utils";
import { userDetailsSelect } from "./user.selectors";

export const create = async (dataSafe: DTO.CreateUserDto) => {
  const { body } = dataSafe;
  const { name, phone, password } = body;

  const userExists = await repositoryUser.findUserByPhone({ phone });
  if (userExists) throw ApiError.Conflict("Phone");

  const hashedPassword = await HashHelper.hash(password);

  const user = await repositoryUser.createUser({
    name,
    phone,
    password: hashedPassword,
  });

  return omit(user, ["password", "logoutAt"]);
};

export const update = async (
  currentUser: User,
  dataSafe: DTO.UpdateUserDto,
) => {
  const { body, params } = dataSafe;
  const { userId } = params;
  const { name, phone, isActive } = body;

  const targetUser = await repositoryUser.findUserById({ id: userId });

  if (!targetUser) throw ApiError.NotFound({ model: "User" });

  assertCanModifyUser({ currentUser, targetUser });

  const updateData: Prisma.UserUpdateInput = {};

  if (phone && phone === targetUser.phone) {
    const phoneExists = await repositoryUser.findUserByPhone({
      phone: targetUser.phone,
    });
    if (phoneExists) throw ApiError.Conflict("Phone");
    updateData.phone = phone;
    updateData.logoutAt = dayjs().toDate();
  }

  if (name && name !== targetUser.name) updateData.name = name;
  if (typeof isActive !== "undefined" && isActive !== targetUser.isActive)
    updateData.isActive = isActive;

  const isSameUser = Object.keys(updateData).length === 0;

  if (isSameUser) {
    return targetUser;
  }

  return await repositoryUser.updateUser({
    id: targetUser.id,
    data: updateData,
  });
};

export const remove = async (
  currentUser: User,
  dataSafe: DTO.DeleteUserDto,
) => {
  const { params } = dataSafe;
  const { userId } = params;

  const targetUser = await repositoryUser.findUserById({ id: userId });
  if (!targetUser) throw ApiError.NotFound({ model: "User" });

  assertCanModifyUser({ currentUser, targetUser });

  const user = await repositoryUser.deleteUser(targetUser.id);

  return omit(user, ["password", "logoutAt"]);
};

export const getAll = async (dataSafe: DTO.GetAllUsersDto) => {
  const { query } = dataSafe;
  const { limit, page, search, role, isActive } = query;

  const where = buildUserWhere({ role, search, isActive });

  const { users, count } = await repositoryUser.findManyUsers({
    where,
    take: limit,
    skip: Math.min(0, page - 1) * limit,
    orderBy: { createdAt: "desc" },
  });

  const { safePage, totalPages } = getPaginationParams({ limit, page, count });

  const pagination = { limit, page: safePage, totalPages, total: count };

  const usersSafe = users.map((user) => omit(user, ["password", "logoutAt"]));

  return { items: usersSafe, pagination };
};

export const getDetails = async (dataSafe: DTO.GetUserDetailsDto) => {
  const { params } = dataSafe;
  const { userId } = params;

  const user = await repositoryUser.findUserById({
    id: userId,
    select: userDetailsSelect,
  });

  if (!user) throw ApiError.NotFound({ model: "User" });

  return omit(user, ["password", "logoutAt"]);
};