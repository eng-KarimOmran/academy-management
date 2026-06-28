import { SubscriptionStatus } from "../../../prisma/generated/enums";
import {
  SubscriptionOrderByWithRelationInput,
  SubscriptionWhereInput,
} from "../../../prisma/generated/models";
import { GetSubscriptionStatusParams } from "./Subscription.type";

export const buildSubscriptionWhere = ({
  search,
  subscriptionStatus,
  academyId,
}: {
  search?: string;
  academyId: string;
  subscriptionStatus?: SubscriptionStatus;
}): SubscriptionWhereInput => {
  const where: SubscriptionWhereInput = { academyId };

  if (search) {
    where.OR = [
      { id: { contains: search } },
      { client: { name: { contains: search, mode: "insensitive" } } },
      { client: { phone: { contains: search } } },
    ];
  }

  if (subscriptionStatus) {
    where.subscriptionStatus = subscriptionStatus;
  }

  return where;
};

export const orderBy: SubscriptionOrderByWithRelationInput = {
  createdAt: "desc",
};

export const getSubscriptionStatus = (params: GetSubscriptionStatusParams): SubscriptionStatus => {
  const {
    usedLessons,
    totalLessons,
    netPaid,
    requiredInitialDeposit,
    subscriptionPrice,
    isCanceled,
    scheduledLessons,
    sessionsBeforeFullPayment,
  } = params

  if (isCanceled) {
    return SubscriptionStatus.CANCELED;
  }

  if (usedLessons >= totalLessons) {
    return SubscriptionStatus.COMPLETED;
  }

  const isDepositPaid = netPaid >= requiredInitialDeposit;
  const isFullyPaid = netPaid >= subscriptionPrice;
  const hasScheduledSession = scheduledLessons > 0;
  const reachedPaymentLimit = usedLessons + scheduledLessons >= sessionsBeforeFullPayment;

  if (!isDepositPaid) {
    return SubscriptionStatus.PENDING_DEPOSIT;
  }

  if (!hasScheduledSession) {
    return SubscriptionStatus.PENDING_FIRST_SESSION;
  }

  if (!isFullyPaid) {
    return reachedPaymentLimit ? SubscriptionStatus.SUSPENDED : SubscriptionStatus.ACTIVE_LIMITED;
  }

  return SubscriptionStatus.ACTIVE;
};