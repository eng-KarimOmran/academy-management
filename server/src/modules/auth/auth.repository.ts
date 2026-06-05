import dayjs from "dayjs";
import { prisma } from "../../lib/prisma";
import env from "../../config/env";

export const addTokenBlacklist = async (jti: string) => {
  return prisma.blacklistedToken.create({
    data: {
      jti,
      expiresAt: dayjs().add(env.token.REFRESH_EXPIRATION, "second").toDate(),
    },
  });
};

export const isBlacklisted = async (jti: string) => {
  return prisma.blacklistedToken.findUnique({
    where: { jti },
  });
};

export const cleanupExpiredBlacklistedTokens = async () => {
  return await prisma.blacklistedToken.deleteMany({
    where: {
      expiresAt: { lt: dayjs().toDate() },
    },
  });
};

export const logoutAllDevices = async (id: string) => {
  return await prisma.user.update({
    where: { id },
    data: { logoutAt: dayjs().toDate() },
  });
};

export const changePasswordUser = async ({
  id,
  hashPassword,
}: {
  id: string;
  hashPassword: string;
}) => {
  return await prisma.user.update({
    where: { id },
    data: {
      isPasswordChanged: true,
      logoutAt: dayjs().toDate(),
      password: hashPassword,
    },
  });
};
