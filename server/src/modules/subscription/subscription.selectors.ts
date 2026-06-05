import { SubscriptionSelect } from "../../../prisma/generated/models";

export const subscriptionBaseSelect: SubscriptionSelect = {
  id: true,
  status: true,
  priceAtBooking: true,
  totalSessions: true,
  trainingTypeAtRegistration: true,
  sessionDurationMinutes: true,
  createdAt: true,
  area: { select: { id: true, name: true } },
  client: { select: { id: true, name: true, phone: true } },
  course: { select: { id: true, name: true } },
  academy: { select: { id: true, name: true } },
};

export const subscriptionDetailsSelect: SubscriptionSelect = {
  ...subscriptionBaseSelect,
  lessons: {
    select: {
      id: true,
      startTime: true,
      endTime: true,
      status: true,
      transmission: true,
      expectedAmount: true,
      car: {
        select: { id: true, modelName: true, plateNumber: true },
      },
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
  },
  payments: {
    select: {
      id: true,
      amount: true,
      paymentMethod: true,
      type: true,
      status: true,
      createdAt: true,
      receiver: {
        select: { id: true, name: true, phone: true },
      },
    },
  },
};