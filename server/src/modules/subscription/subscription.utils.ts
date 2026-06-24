import { SubscriptionStatus } from "../../../prisma/generated/enums";
import { SubscriptionWhereInput } from "../../../prisma/generated/models";

export const buildSubscriptionWhere = ({
  search,
  status,
  academyId,
}: {
  search?: string;
  academyId: string;
  status?: SubscriptionStatus;
}): SubscriptionWhereInput => {
  const where: SubscriptionWhereInput = { academyId };

  if (search) {
    where.OR = [
      { client: { name: { contains: search, mode: "insensitive" } } },
      { client: { phone: { contains: search } } },
    ];
  }

  if (status) {
    where.status = status;
  }

  return where;
};

export const getSubscriptionStatus = ({
  usedLessons,
  totalLessons,
  totalPaid,
  requiredInitialDeposit,
  subscriptionPrice,
  isCanceled,
}: {
  usedLessons: number;
  totalLessons: number;
  totalPaid: number;
  requiredInitialDeposit: number;
  subscriptionPrice: number;
  isCanceled?: boolean;
}): SubscriptionStatus => {
  if (isCanceled) return SubscriptionStatus.CANCELED;

  if (usedLessons >= totalLessons) {
    return SubscriptionStatus.COMPLETED;
  }

  if (totalPaid < requiredInitialDeposit) {
    return SubscriptionStatus.PENDING_DEPOSIT;
  }

  if (totalPaid < subscriptionPrice) {
    return SubscriptionStatus.ACTIVE_LIMITED;
  }

  return SubscriptionStatus.ACTIVE;
};