import * as DTO from "./user.dto";
import ApiError from "../../shared/utils/ApiError";
import dayjs from "dayjs";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { Prisma, Role, User } from "../../../prisma/generated/client";
import UserRepository from "./user.repository";
import { omit } from "../../shared/utils/omit";
import { assertCanModifyUser, buildUserWhere } from "./user.utils";
import { userAcademyRelationsSelect, userDetailsSelect } from "./user.selectors";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import HashHelper from "../auth/auth.utils";

const UserService = {
  async create(dataSafe: DTO.CreateUserDto) {
    const { name, phone, password } = dataSafe.body;

    const userExists = await UserRepository.findByPhone({ phone });
    if (userExists) throw ApiError.Conflict("Phone");

    const hashedPassword = await HashHelper.hash(password);

    const user = await UserRepository.create({
      data: {
        name,
        phone,
        password: hashedPassword,
      }
    });

    return omit(user, ["password", "logoutAt"]);
  },

  async update({ currentUser, dataSafe }: { currentUser: User; dataSafe: DTO.UpdateUserDto }) {
    const { body, params } = dataSafe;
    const { userId } = params;
    const { name, phone, isActive } = body;

    const targetUser = await UserRepository.findById({ userId });
    if (!targetUser) throw ApiError.NotFound({ model: "User" });

    assertCanModifyUser({ currentUser, targetUser });

    const updateData: Prisma.UserUpdateInput = {};

    if (phone && phone !== targetUser.phone) {
      const phoneExists = await UserRepository.findByPhone({ phone });
      if (phoneExists) throw ApiError.Conflict("Phone");
      updateData.phone = phone;
      updateData.logoutAt = dayjs().toDate();
    }

    if (name && name !== targetUser.name) updateData.name = name;
    if (typeof isActive !== "undefined" && isActive !== targetUser.isActive) {
      updateData.isActive = isActive;
    }

    if (Object.keys(updateData).length === 0) {
      return omit(targetUser, ["password", "logoutAt"]);
    }

    const updatedUser = await UserRepository.update({
      userId: targetUser.id,
      data: updateData,
    });

    return omit(updatedUser, ["password", "logoutAt"]);
  },

  async remove({ currentUser, dataSafe }: { currentUser: User; dataSafe: DTO.DeleteUserDto }) {
    const { userId } = dataSafe.params;

    const targetUser = await UserRepository.findById({ userId });
    if (!targetUser) throw ApiError.NotFound({ model: "User" });

    assertCanModifyUser({ currentUser, targetUser });

    const user = await UserRepository.delete({ userId: targetUser.id });

    return omit(user, ["password", "logoutAt"]);
  },

  async getAll(dataSafe: DTO.GetAllUsersDto) {
    const { limit, page, search, role, isActive } = dataSafe.query;

    const where = buildUserWhere({ role, search, isActive });
    const { take, skip } = getPagination({ page, limit });

    const { users, count } = await UserRepository.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, totalPages, total: count };

    const usersSafe = users.map((user) => omit(user, ["password", "logoutAt"]));

    return { items: usersSafe, pagination };
  },

  async getDetails(dataSafe: DTO.GetUserDetailsDto) {
    const { userId } = dataSafe.params;

    const user = await UserRepository.findById({
      userId,
      select: userDetailsSelect,
    });

    if (!user) throw ApiError.NotFound({ model: "User" });

    return omit(user, ["password", "logoutAt"]);
  },

  async recalculateUserRole({ userId, tx }: { userId: string; tx?: TransactionClient }) {
    const user = await UserRepository.findById({
      userId,
      select: userAcademyRelationsSelect,
      tx
    });

    if (!user) throw ApiError.NotFound({ model: "User" });

    const roles = new Set<Role>();

    if (user.academies?.length) roles.add("OWNER");
    if (user.captainProfile) roles.add("CAPTAIN");
    if (user.secretaryProfile) roles.add("SECRETARY");

    await UserRepository.update({
      userId: user.id,
      data: {
        roles: {
          set: [...roles],
        },
      },
      tx
    });
  },
};

export default UserService;