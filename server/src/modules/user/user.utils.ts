import dayjs from "dayjs";
import { Role, User } from "../../../prisma/generated/client";
import ApiError from "../../shared/utils/ApiError";
import { UserWhereInput } from "../../../prisma/generated/models";

export const assertCanModifyUser = ({
  currentUser,
  targetUser,
}: {
  currentUser: User;
  targetUser: User;
}) => {
  if (currentUser.id === targetUser.id) return;

  if (!targetUser.roles.includes("OWNER")) return;

  const currentIsNewer = dayjs(currentUser.createdAt).isAfter(
    dayjs(targetUser.createdAt),
  );

  if (currentIsNewer) {
    throw ApiError.Forbidden("لا يمكنك تعديل أي بيانات خاصة بهذا المستخدم");
  }
};

export const buildUserWhere = ({
  role,
  search,
  isActive,
}: {
  search?: string;
  role?: Role;
  isActive?: boolean;
}): UserWhereInput => {
  const where: UserWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
    ];
  }

  if (role) {
    where.roles = { has: role };
  }

  if (typeof isActive !== "undefined") {
    where.isActive = isActive;
  }

  return where;
};