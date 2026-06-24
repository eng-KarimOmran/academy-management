import dayjs from "dayjs";
import { User, UserRole } from "../../../prisma/generated/client";
import ApiError from "../../shared/utils/ApiError";
import { UserOrderByWithRelationInput, UserWhereInput } from "../../../prisma/generated/models";

export const assertCanModifyUser = ({
  currentUser,
  targetUser,
}: {
  currentUser: User;
  targetUser: User;
}) => {
  if (currentUser.id === targetUser.id) return;

  if (currentUser.userRole !== "ADMIN") throw ApiError.Forbidden()

  const currentIsNewer = dayjs(currentUser.createdAt).isAfter(dayjs(targetUser.createdAt));

  if (currentIsNewer) {
    throw ApiError.Forbidden();
  }
};

export const buildUserWhere = ({
  search,
  isActive,
  userRole
}: {
  search?: string;
  isActive?: boolean;
  userRole?: UserRole
}): UserWhereInput => {
  const where: UserWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
    ];
  }

  if (typeof isActive !== "undefined") {
    where.isActive = isActive;
  }

  if (userRole) {
    where.userRole = userRole
  }

  return where;
};

export const orderBy: UserOrderByWithRelationInput = { createdAt: "desc" } 