import { LessonSelect } from "../../../prisma/generated/models";

export const lessonBaseSelect: LessonSelect = {
  id: true,
  startTime: true,
  endTime: true,
  status: true,
  transmission: true,
  expectedAmount: true,
  subscriptionId: true,
  isPaid: true,
  captainLessonPrice: true,
  carSessionPrice: true,
  car: {
    select: {
      id: true,
      modelName: true,
      plateNumber: true,
    },
  },
  area: {
    select: {
      id: true,
      name: true,
    },
  },
  captain: {
    select: {
      id: true,
      userId: true,
      user: { select: { id: true, name: true, phone: true } },
    },
  },
  client: { select: { id: true, name: true, phone: true } },
  academy: {
    select: { id: true, name: true, phone: true },
  },
};
