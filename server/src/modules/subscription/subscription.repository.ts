import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  SubscriptionCreateInput,
  SubscriptionOrderByWithRelationInput,
  SubscriptionSelect,
  SubscriptionUpdateInput,
  SubscriptionWhereInput,
} from "../../../prisma/generated/models";
import { prisma } from "../../lib/prisma";
import ApiError from "../../shared/utils/ApiError";
import { calculateFinancial } from "../paymentTransaction/paymentTransaction.utils";
import { subscriptionBaseSelect } from "./subscription.selectors";
import { getSubscriptionStatus } from "./subscription.utils";

export const findSubscriptionById = async ({
  id,
  select = subscriptionBaseSelect,
}: {
  id: string;
  select?: SubscriptionSelect;
}) => {
  return await prisma.subscription.findUnique({
    where: { id },
    select,
  });
};

export const findManySubscriptions = async (data: {
  where?: SubscriptionWhereInput;
  skip?: number;
  take?: number;
  orderBy?: SubscriptionOrderByWithRelationInput;
}) => {
  const [subscriptions, count] = await prisma.$transaction([
    prisma.subscription.findMany({
      ...data,
      select: subscriptionBaseSelect,
    }),
    prisma.subscription.count({ where: data.where }),
  ]);
  return { subscriptions, count };
};

export const createSubscription = async (data: SubscriptionCreateInput) => {
  return await prisma.subscription.create({
    data,
    select: subscriptionBaseSelect,
  });
};

export const remove = async (id: string) => {
  return await prisma.subscription.delete({
    where: { id },
    select: subscriptionBaseSelect,
  });
};

export const updateSubscription = async ({
  id,
  data,
}: {
  id: string;
  data: SubscriptionUpdateInput;
}) => {
  return await prisma.subscription.update({
    where: { id },
    data,
    select: subscriptionBaseSelect,
  });
};

export const recalculateSubscriptionStatus = async ({
  id,
  tx,
}: {
  id: string;
  tx?: TransactionClient;
}) => {
  const client = tx ?? prisma;
  const subscription = await client.subscription.findUnique({
    where: { id },
    include: {
      payments: { where: { status: "COMPLETED" } },
      lessons: true,
    },
  });

  if (!subscription) {
    throw ApiError.NotFound({ model: "Subscription" });
  }

  const usedLessons = subscription.lessons.filter((l) =>
    ["COMPLETED", "CANCELED_CHARGED"].includes(l.status),
  ).length;

  const bookedLessons = subscription.lessons.filter(
    (l) => l.status === "SCHEDULED",
  ).length;

  const { netPaid } = calculateFinancial(
    subscription.payments,
    subscription.priceAtBooking,
  );

  const status = getSubscriptionStatus({
    bookedLessons,
    totalLessons: subscription.totalSessions,
    subscriptionPrice: subscription.priceAtBooking,
    totalPaid: netPaid,
    usedLessons,
  });

  return await client.subscription.update({
    where: { id },
    data: {
      status,
    },
  });
};
