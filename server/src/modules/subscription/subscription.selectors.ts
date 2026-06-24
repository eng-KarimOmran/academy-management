import {
  SubscriptionGetPayload,
  SubscriptionSelect,
} from "../../../prisma/generated/models";

export const subscriptionBaseSelect: SubscriptionSelect = {
  id: true,
  status: true,
  createdAt: true,
  priceAtBooking: true,
  totalSessions: true,
  trainingTypeAtRegistration: true,
  sessionDurationMinutes: true,
  area: { select: { id: true, name: true } },
  client: { select: { id: true, name: true, phone: true, academyId: true } },
  course: { select: { id: true, name: true } },
  academy: { select: { id: true, name: true } },
};

export const subscriptionDetailsSelect: SubscriptionSelect = {
  ...subscriptionBaseSelect,
  requiredInitialDeposit: true,
  sessionsBeforeFullPayment: true,
  createdBy: { select: { id: true, name: true, phone: true } },

  lessons: {
    select: {
      id: true,
      startTime: true,
      endTime: true,
      status: true,
      transmission: true,
      expectedAmount: true,
      area: {
        select: { id: true, name: true },
      },
      captain: {
        select: {
          id: true,
          user: { select: { id: true, name: true, phone: true } },
        },
      },
    },
  }
};