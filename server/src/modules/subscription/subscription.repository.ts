import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  SubscriptionCreateInput,
  SubscriptionOrderByWithRelationInput,
  SubscriptionSelect,
  SubscriptionUpdateInput,
  SubscriptionWhereInput,
} from "../../../prisma/generated/models";
import getClient from "../../shared/utils/getClient";
import ApiError from "../../shared/utils/ApiError";
import { subscriptionBaseSelect } from "./subscription.selectors";
import { calculateFinancial } from "../paymentTransaction/paymentTransaction.utils";
import { getSubscriptionStatus } from "./subscription.utils";

const SubscriptionRepository = {
  async findById({ id, select = subscriptionBaseSelect, tx }: { id: string; select?: SubscriptionSelect; tx?: TransactionClient }) {
    return await getClient(tx).subscription.findUnique({
      where: { id },
      select,
    });
  },

  async findMany({ where, skip, take, orderBy, select = subscriptionBaseSelect, tx }: { where?: SubscriptionWhereInput; skip?: number; take?: number; orderBy?: SubscriptionOrderByWithRelationInput; select?: SubscriptionSelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [subscriptions, count] = await Promise.all([
      client.subscription.findMany({ where, skip, take, orderBy, select }),
      client.subscription.count({ where }),
    ]);
    return { subscriptions, count };
  },

  async create({ data, tx }: { data: SubscriptionCreateInput; tx?: TransactionClient }) {
    return await getClient(tx).subscription.create({
      data,
      select: subscriptionBaseSelect,
    });
  },

  async update({ id, data, tx }: { id: string; data: SubscriptionUpdateInput; tx?: TransactionClient }) {
    return await getClient(tx).subscription.update({
      where: { id },
      data,
      select: subscriptionBaseSelect,
    });
  },

  async delete({ id, tx }: { id: string; tx?: TransactionClient }) {
    return await getClient(tx).subscription.delete({
      where: { id },
      select: subscriptionBaseSelect,
    });
  },

  async recalculateSubscriptionStatus({ id, tx }: { id: string; tx?: TransactionClient }) {
    const client = getClient(tx);
    
    const subscription = await client.subscription.findUnique({
      where: { id },
      include: {
        payments: { where: { status: "COMPLETED" } },
        lessons: true,
      },
    });

    if (!subscription) throw ApiError.NotFound({ model: "Subscription" });

    if (subscription.status === "CANCELED") return subscription;

    const usedLessons = subscription.lessons.filter((l) =>
      ["COMPLETED", "CANCELED_CHARGED"].includes(l.status)
    ).length;

    const bookedLessons = subscription.lessons.filter((l) => 
      l.status === "SCHEDULED"
    ).length;

    const { netPaid } = calculateFinancial(
      subscription.payments,
      subscription.priceAtBooking
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
      data: { status },
      select: subscriptionBaseSelect,
    });
  }
};

export default SubscriptionRepository;