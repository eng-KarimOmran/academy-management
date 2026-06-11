import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import dayjs from "dayjs";
import env from "../../config/env";
import getClient from "../../shared/utils/getClient"

const AuthRepository = {
  async addTokenBlacklist({ jti, tx }: { jti: string; tx?: TransactionClient }) {
    return getClient(tx).blacklistedToken.create({
      data: {
        jti,
        expiresAt: dayjs().add(env.token.REFRESH_EXPIRATION, "second").toDate(),
      },
    });
  },

  async isBlacklisted({ jti, tx }: { jti: string; tx?: TransactionClient }) {
    return getClient(tx).blacklistedToken.findUnique({
      where: { jti },
    });
  },

  async cleanupExpiredBlacklistedTokens({ tx }: { tx?: TransactionClient } = {}) {
    return getClient(tx).blacklistedToken.deleteMany({
      where: {
        expiresAt: { lt: dayjs().toDate() },
      },
    });
  },

  async logoutAllDevices({ userId, tx }: { userId: string; tx?: TransactionClient }) {
    return getClient(tx).user.update({
      where: { id: userId },
      data: { logoutAt: dayjs().toDate() },
    });
  },

  async changePasswordUser({ userId, hashPassword, tx }: { userId: string; hashPassword: string; tx?: TransactionClient }) {
    return getClient(tx).user.update({
      where: { id: userId },
      data: {
        isPasswordChanged: true,
        logoutAt: dayjs().toDate(),
        password: hashPassword,
      },
    });
  },
};

export default AuthRepository;