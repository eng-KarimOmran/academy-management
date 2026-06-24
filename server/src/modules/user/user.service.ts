import * as DTO from "./user.dto";
import ApiError from "../../shared/utils/ApiError";
import dayjs from "dayjs";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { Prisma, Role, User } from "../../../prisma/generated/client";
import { omit } from "../../shared/utils/omit";
import { assertCanModifyUser, buildUserWhere } from "./user.utils";
import { userAcademyRelationsSelect, userDetailsSelect } from "./user.selectors";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import HashHelper from "../auth/auth.utils";
import { prisma } from "../../lib/prisma";

interface IUserService {
  create: (data: { dataSafe: DTO.CreateUserDto; tx?: TransactionClient }) => Promise<Partial<User>>;
  update: (data: { currentUser: User; dataSafe: DTO.UpdateUserDto; tx?: TransactionClient }) => Promise<Partial<User>>;
  delete: (data: { currentUser: User; dataSafe: DTO.DeleteUserDto; tx?: TransactionClient }) => Promise<Partial<User>>;
  getAll: (data: { dataSafe: DTO.GetAllUsersDto; tx?: TransactionClient }) => Promise<{ items: Partial<User>[]; pagination: { limit: number; page: number; totalPages: number; total: number } }>;
  getDetails: (data: { dataSafe: DTO.GetUserDetailsDto; tx?: TransactionClient }) => Promise<Partial<User>>;
  recalculateUserRole: (data: { userId: string; tx?: TransactionClient }) => Promise<void>;
}

const UserService: IUserService = {
  async create({ dataSafe, tx }) {
    const { name, phone, password } = dataSafe.body;

    const run = async (tx: TransactionClient) => {
      const userExists = await tx.user.findFirst({ where: { phone } });
      if (userExists) throw ApiError.Conflict("Phone");

      const hashedPassword = await HashHelper.hash(password);

      const user = await tx.user.create({
        data: {
          name,
          phone,
          password: hashedPassword,
        }
      });

      return omit(user, ["password", "logoutAt"]);
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async update({ currentUser, dataSafe, tx }) {
    const { body, params } = dataSafe;
    const { userId } = params;
    const { name, phone, isActive } = body;

    const run = async (tx: TransactionClient) => {
      const targetUser = await tx.user.findUnique({ where: { id: userId } });
      if (!targetUser) throw ApiError.NotFound({ model: "User" });

      assertCanModifyUser({ currentUser, targetUser });

      const updateData: Prisma.UserUpdateInput = {};

      if (phone && phone !== targetUser.phone) {
        const phoneExists = await tx.user.findFirst({ where: { phone } });
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

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: updateData,
      });

      return omit(updatedUser, ["password", "logoutAt"]);
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async delete({ currentUser, dataSafe, tx }) {
    const { userId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const targetUser = await tx.user.findUnique({ where: { id: userId } });
      if (!targetUser) throw ApiError.NotFound({ model: "User" });

      assertCanModifyUser({ currentUser, targetUser });

      const user = await tx.user.delete({ where: { id: userId } });

      return omit(user, ["password", "logoutAt"]);
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getAll({ dataSafe, tx }) {
    const { limit, page, search, role, isActive } = dataSafe.query;

    const run = async (tx: TransactionClient) => {
      const where = buildUserWhere({ role, search, isActive });
      const { take, skip } = getPagination({ page, limit });

      const [users, count] = await Promise.all([
        tx.user.findMany({
          where,
          take,
          skip,
          orderBy: { createdAt: "desc" },
        }),
        tx.user.count({ where })
      ]);

      const totalPages = getTotalPages({ limit, count });
      const pagination = { limit, page, totalPages, total: count };

      const usersSafe = users.map((user) => omit(user, ["password", "logoutAt"]));

      return { items: usersSafe, pagination };
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getDetails({ dataSafe, tx }) {
    const { userId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: userDetailsSelect,
      });

      if (!user) throw ApiError.NotFound({ model: "User" });

      return omit(user, ["password", "logoutAt"]);
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async recalculateUserRole({ userId, tx }) {
    const run = async (tx: TransactionClient) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: userAcademyRelationsSelect,
      });

      if (!user) throw ApiError.NotFound({ model: "User" });

      const roles = new Set<Role>();

      if (user.academies?.length) roles.add("OWNER");
      if (user.captainProfile) roles.add("CAPTAIN");
      if (user.secretaryProfile) roles.add("SECRETARY");

      await tx.user.update({
        where: { id: userId },
        data: {
          roles: {
            set: [...roles],
          },
        },
      });
    };

    tx ? await run(tx) : await prisma.$transaction(run);
  },
};

export default UserService;