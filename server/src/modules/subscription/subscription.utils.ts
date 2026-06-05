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
  totalLessons,
  usedLessons,
  bookedLessons,
  subscriptionPrice,
  totalPaid,
}: {
  totalLessons: number;
  usedLessons: number;
  bookedLessons: number;
  subscriptionPrice: number;
  totalPaid: number;
}): SubscriptionStatus => {
  if (usedLessons >= totalLessons) {
    return SubscriptionStatus.COMPLETED;
  }

  if (usedLessons + bookedLessons >= totalLessons) {
    return SubscriptionStatus.FULLYBOOKED;
  }

  if (totalPaid < 50) {
    return SubscriptionStatus.PAUSED;
  }

  const oneThirdLessons = Math.floor(totalLessons / 3);

  if (bookedLessons > oneThirdLessons && totalPaid < subscriptionPrice) {
    return SubscriptionStatus.PAUSED;
  }

  return SubscriptionStatus.ACTIVE;
};